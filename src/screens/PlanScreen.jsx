import {
  collection,
  query,
  where,
  getDocs,
  doc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/UserSlice";
import { loadStripe } from "@stripe/stripe-js";

function PlanScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const customerRef = collection(db, "customers");
        const subscriptionDocRef = doc(customerRef, user.uid);
        const subscriptionRef = collection(subscriptionDocRef, "subscriptions");
        const subscriptionSnapshot = await getDocs(subscriptionRef);

        if (!subscriptionSnapshot.empty) {
          // Get the first subscription document
          const subscriptionDoc = subscriptionSnapshot.docs[0];
          const subscriptionData = subscriptionDoc.data();

          setSubscription({
            role: subscriptionData.role,
            current_period_end: subscriptionData.current_period_end.seconds,
            current_period_start: subscriptionData.current_period_start.seconds,
          });
        } else {
          console.log("No subscription found for this user");
        }
      } catch (error) {
        console.log(
          `There was an error loading subscription: ${error.message}`
        );
      }
    };

    if (user?.uid) {
      fetchSubscription();
    }
  }, [user?.uid]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Create a query against the "products" collection
        const productsRef = collection(db, "products");
        const activeProductsQuery = query(
          productsRef,
          where("active", "==", true)
        );
        const productSnapshot = await getDocs(activeProductsQuery);

        const productsData = {};

        // Use Promise.all to handle async operations
        await Promise.all(
          productSnapshot.docs.map(async (productDoc) => {
            productsData[productDoc.id] = productDoc.data();

            // Get the prices subcollection
            const pricesRef = collection(
              db,
              "products",
              productDoc.id,
              "prices"
            );
            const pricesSnapshot = await getDocs(pricesRef);

            // Store first price ID for each product
            pricesSnapshot.docs.forEach((priceDoc) => {
              if (!productsData[productDoc.id].priceId) {
                productsData[productDoc.id].priceId = priceDoc.id;
              }
            });
          })
        );

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const loadCheckout = async (priceId) => {
    try {
      // Firebase v9 syntax for adding a document to a collection
      const customersRef = collection(db, "customers");
      const userDocRef = doc(customersRef, user.uid);
      const checkoutSessionsRef = collection(userDocRef, "checkout_sessions");

      const docRef = await addDoc(checkoutSessionsRef, {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

      // Set up listener for the created document
      onSnapshot(docRef, async (snap) => {
        const data = snap.data();

        if (!data) return;

        const { error, sessionId } = data;

        if (error) {
          alert(`An error has occurred: ${error.message}`);
        }

        if (sessionId) {
          // Initialize Stripe
          const stripe = await loadStripe(
            "pk_test_51R0Gz02NzCnnzvKlAKiwe9qMsHFhHQnNhnwE2sorCe5Ep7LlJmRyPw6WFu790Wg1nZMcJDm36rqsKMZd6hgOV8Y7009uv7lS08"
          );

          stripe.redirectToCheckout({ sessionId });
        }
      });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert(`Failed to start checkout: ${error.message}`);
    }
  };

  // Keeping the return section exactly as it was in your code
  return (
    <div>
      {subscription && <p className="mb-3 text-sm">Renewal Date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name?.includes(subscription?.role);
        return (
          <div
            key={productId}
            className="plans flex justify-between ml-5 mr-5 mb-5 opacity-80 hover:opacity-100 cursor-default"
          >
            <div className="text-xs text-gray-400">
              <p>{productData.name}</p>
              <p>{productData.description}</p>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.priceId)
              }
              className={`text-sm w-fit px-4 rounded-sm  ${
                isCurrentPackage? "bg-gray-500 cursor-not-allowed":"bg-[#e50914] cursor-pointer"
              } `}
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlanScreen;

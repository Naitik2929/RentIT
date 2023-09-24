import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { Slider } from "@material-tailwind/react";
import Header from "../components/Header";
import Cookies from "js-cookie";
import { BiArrowBack } from "react-icons/bi";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  
  const handleBackButtonClick = () => {
    navigate(-1);
  };
  const [product, setProduct] = useState(null);
  const [offerprice, setOfferprice] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:6969/api/product/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data.product);
          setOfferprice(data.product.price);
        } else {
          console.error("Failed to fetch product");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        <TailSpin
          height="80"
          width="80"
          color="grey"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </section>
    );
  }
  const handleOfferClick = () => {
    const postOffer = async () => {
      try {
        const userDataFromCookie = Cookies.get("userData");
        if (userDataFromCookie) {
          try {
            const parsedUserData = JSON.parse(userDataFromCookie);
           var userid = parsedUserData._id;
           var username =  parsedUserData.name;
          } catch (error) {
            console.error("Error parsing user data from cookies:", error);
          }
        }
        const response = await fetch(
          `http://localhost:6969/api/product/offer/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ offerprice ,userid,username}),
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("success");
          toast.success("Offer is sent")
          
        } else {
          console.error("Failed to post offer");
          toast.error("falied to sent offer");
        }
      } catch (error) {
        console.error("Error post offer :", error);
      }
    };
    postOffer();
  };
  const { name, price, description, image } = product;

  return (
    <>
      <Header />
      <div className="flex items-center mb-4">
        <BiArrowBack
          className="cursor-pointer text-3xl text-gray-500 hover:text-gray-700"
          onClick={handleBackButtonClick}
        />
      </div>

      <section className="pt-16 pb-12 lg:py-32 h-screen flex items-center bg-white shadow-lg my-9 ">
        <div className="container mx-auto  ">
          <div className="p-8 rounded-lg ">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
                <img
                  className="max-w-[200px] lg:max-w-xs rounded-lg"
                  src={`http://localhost:6969/${image}`}
                  alt=""
                />
              </div>

              <div className="flex-1 text-center lg:text-left justify-between">
                <h1 className="text-3xl font-semibold mb-2 max-w-[450px] mx-auto lg:mx-0">
                  {name}
                </h1>
                <div className="text-2xl text-red-500 font-semibold mb-6">
                  ₹ {offerprice ? offerprice : price}
                </div>
                <p className="text-gray-600 mb-8">{description}</p>
                <div className="flex flex-col">
                  <input
                    type="range"
                    onChange={(e) => setOfferprice(e.target.value)}
                    min={1}
                    max={price}
                    step={1}
                    value={offerprice ? offerprice : price}
                    className="w-full bg-gray-300 appearance-none rounded-md h-5"
                  />
                  <p className="text-gray-600 text-center mt-2">
                    Your Offer: ₹{offerprice}
                  </p>
                </div>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mt-4"
                  onClick={handleOfferClick}
                >
                  Make an Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;

import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import StarRating from '../componets/StarRating';
import Reviews from '../componets/Reviews';
import AddReview from '../componets/AddReview';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await RestaurantFinder.get(`/${id}`);
       
        setSelectedRestaurant(response.data.data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  },[])

  return (
    <div>

      {selectedRestaurant && (
        <>
        <h1 className="text-center display-1">{selectedRestaurant.restaurant.name}</h1>
        <div className="text-center">
          <StarRating rating={selectedRestaurant.restaurant.average_rating} />
          <span className="text-warning ml-1">
            {selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})` : '(0)'}
          </span>
        </div>
        <div className="mt-3">
          <Reviews reviews={selectedRestaurant.reviews} />
        </div>
          <AddReview />
        </>
      )}
    </div>
  )
}

export default RestaurantDetailPage;

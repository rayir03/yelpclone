import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';

function UpdateRestaurant(props) {

    const { id } = useParams();
    const {restaurants } = useContext(RestaurantsContext);
    const [ name, setName ] = useState("");
    const [ location, setLocation ] = useState("");
    const [ priceRange, setPriceRange ] = useState("");
    let navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await RestaurantFinder.get(`/${id}`)
            
            setName(response.data.data.restaurant.name);
            setLocation(response.data.data.restaurant.location);
            setPriceRange(response.data.data.restaurant.price_range);
        }
        fetchData();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range: priceRange
        });
        navigate("/");
    }

  return (
    <div>
      <form action="">
        <div className="form-group">
            <label htmlFor="name">Name</label>
            <input value={name} onChange={e => setName(e.target.value)}  type="text" name="name" id="name" className="form-control"/>
        </div>
        <div className="form-group">
            <label htmlFor="location">Location</label>
            <input value={location} onChange={e => setLocation(e.target.value)} type="text" name="location" id="location" className="form-control"/>
        </div>
        <div className="form-group">
            <label htmlFor="price_range">Price Range</label>
            <input value={priceRange} onChange={e => setPriceRange(e.target.value)} type="text" name="price_range" id="price_range" className="form-control"/>
        </div>

        <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default UpdateRestaurant

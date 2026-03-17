import React, { useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../components/useContext'

function AddLauncherPage() {
    const token = useAuth()?.token

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        rocketType: 'Shahab3',
        latitude: 0,
        longitude: 0,
        city: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5011/api/launchers', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Launcher added successfully!');
            navigate(-1);
        } catch (error) {
            console.error('Error adding launcher:', error);
            alert('Failed to add launcher');
        }
    };

    return (
        <div>
            <Navbar />
            <h1>Add New Launcher</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Rocket Type:</label>
                    <select name="rocketType" value={formData.rocketType} onChange={handleChange}>
                        <option value="Shahab3">Shahab3</option>
                        <option value="Fetah110">Fetah110</option>
                        <option value="Radwan">Radwan</option>
                        <option value="Kheibar">Kheibar</option>
                    </select>
                </div>

                <div>
                    <label>Latitude:</label>
                    <input
                        type="number"
                        step="any"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Longitude:</label>
                    <input
                        type="number"
                        step="any"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" style={{ marginTop: '10px' }}>Save Launcher</button>
                <button type="button" onClick={() => navigate(-1)}>Cancel</button>
            </form>
        </div>
    )
}

export default AddLauncherPage
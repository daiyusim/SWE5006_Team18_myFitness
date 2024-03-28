import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { FormGroup, FormControl, FormLabel } from '@mui/material';

function AddressAutoComplete({ formData,setFormData, prevSave }) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${searchValue}&returnGeom=Y&getAddrDetails=Y&pageNum=1`);
                const data = await response.json();
                if (data.results) {
                    const formattedOptions = data.results.map(result => ({
                        label: result.ADDRESS,
                        value: result.ADDRESS,
                        latitude: result.LATITUDE, 
                        longitude: result.LONGITUDE
                    }));
                    setOptions(formattedOptions);
                } else {
                    setOptions([]);
                }
            } catch (error) {
                console.error('Error fetching options:', error);
            }
            setLoading(false);
        };

        const timer = setTimeout(() => {
            if (searchValue) {
                fetchData();
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchValue]);




    const handleChange = (event, value) => {
        setSearchValue(value);
    };
    const handleAddressChange = (event, selectedOption) => {
        if (selectedOption) {
            setFormData(formData => ({
                            ...formData,
                address: selectedOption.label,
                lat: selectedOption.latitude,
                long: selectedOption.longitude
                        }));
        }
    };
    return (
        <FormGroup>
            <FormControl fullWidth>
                <FormLabel required>Venue Address</FormLabel>
                <Autocomplete
                    id="address-autocomplete"
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    options={options}
                    loading={loading}
                    onInputChange={handleChange}
                    onChange={handleAddressChange}
                    value={prevSave !== null ? prevSave : searchValue !== null ? searchValue : null }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                />
            </FormControl>
        </FormGroup>
    );
}

export default AddressAutoComplete;

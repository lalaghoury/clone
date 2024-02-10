// store.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching data
export const fetchDataAsync = createAsyncThunk('data/fetchData', async () => {
    const response = await fetch('https://foodbackend.netlify.app/.netlify/functions/api/recipe');
    const data = await response.json();
    return data;
});

// Slice for managing state
const dataSlice = createSlice({
    name: 'data',
    initialState: {
        value: [],
        status: 'idle', // idle, loading, succeeded, failed
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDataAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.value = action.payload;
            })
            .addCase(fetchDataAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default dataSlice.reducer;

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BASE_URL}),
    reducerPath: 'adminApi',
    tagTypes: ['User', 'Products', 'Customers', 'Transactions','Sales','Dashboard'],
    endpoints: (build) => ({
        getUser: build.query<any, string>({
            query: (id) => `general/user/${id}`,
            providesTags: ['User']
        }),
        getProducts: build.query<any, void>({
            query: () => 'client/products',
            providesTags: ['Products']
        }),
        getCustomers: build.query<any, void>({
            query: () => 'client/customers',
            providesTags: ['Customers']
        }),
        getTransactions: build.query<any, void>({
            query: () => 'client/transactions',
            providesTags: ['Transactions']
        }),
        getSales: build.query<any, void>({
            query: () => 'sales/sales',
            providesTags: ['Sales']
        }),
        getDashboard: build.query<any, void>({
            query: () => 'general/dashboard',
            providesTags: ['Dashboard']
        }),
    })
})

export const {
    useGetUserQuery, useGetProductsQuery, useGetCustomersQuery, useGetTransactionsQuery, useGetSalesQuery, useGetDashboardQuery
} = api;
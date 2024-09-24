import React from 'react'

const data = [
    {
        Id: 1,
        Name: "test",
        Addres: "test",
        City: "test",
        Country: "test"
    },
    {
        Id: 2,
        Name: "test",
        Addres: "test",
        City: "test",
        Country: "test"
    },
    {
        Id: 3,
        Name: "test",
        Addres: "test",
        City: "test",
        Country: "test"
    },
    {
        Id: 4,
        Name: "test",
        Addres: "test",
        City: "test",
        Country: "test"
    },

]
export default function Warehouse() {
    return (


        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Addres
                        </th>
                        <th scope="col" class="px-6 py-3">
                            City
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Country
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((order) => (
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {order.Name}
                            </th>
                            <td class="px-6 py-4">
                                {order.Addres}
                            </td>
                            <td class="px-6 py-4">
                                {order.City}

                            </td>
                            <td class="px-6 py-4">
                                {order.Country}
                            </td>
                            <td class="px-6 py-4 text-right">
                                <button className="link-style">
                                    Edit
                                </button>

                                <button className="link-style">
                                    |    Itemes
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
}

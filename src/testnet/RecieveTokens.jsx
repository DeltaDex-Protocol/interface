import { useEffect, useState } from "react";


const RecieveTokens = () => {

    return (
        <div className="bg-gray-100 h-screen">
            <div className="max-w-6xl max-h-screen mx-auto flex justify-between">
                <div class="flex-col flex  self-center lg:p-14 sm:max-w-4xl xl:max-w-md  z-10">
                    <div class="self-start hidden lg:flex flex-col  ">
                        <h1 class="my-3 font-semibold text-4xl">Welcome back</h1>
                        <p class="pr-3 text-sm ">Lorem ipsum is placeholder text commonly used in the graphic, print,
                            and publishing industries for previewing layouts and visual mockups</p>
                    </div>
                </div>
                <div class="w-full max-w-xs">
                    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                        <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Username
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
                        </div>
                        <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                        <p class="text-red-500 text-xs italic">Please choose a password.</p>
                        </div>
                        <div class="flex items-center justify-between">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Sign In
                        </button>
                        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Forgot Password?
                        </a>
                        </div>
                    </form>
                    <p class="text-center text-gray-500 text-xs">
                        &copy;2020 Acme Corp. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
        )

}

export default RecieveTokens;
import React, { useState } from 'react'
export default function SimpleTaxForm() {
    const [simpleTaxValues, setSimpleTaxValues] = useState({ tax: 0, period: 0, initial: 0 })
    const [isYear, setIsYear] = useState(true)
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-200">
                        AG
                    </h2>
                    {simpleTaxValues.tax > 0 && simpleTaxValues.period > 0 && simpleTaxValues.initial > 0 && <><h4 className="mt-10 text-center text-1xl font-bold leading-9 tracking-tight text-gray-900 dark:text-green-200">
                        Juros: {simpleTaxValues.tax / 100 * simpleTaxValues.period * simpleTaxValues.initial}
                    </h4>
                        < h4 className="mt-2 text-center text-1xl font-bold leading-9 tracking-tight text-gray-900 dark:text-green-200">
                            Montante: {simpleTaxValues.initial + (simpleTaxValues.tax / 100 * simpleTaxValues.period * simpleTaxValues.initial)}
                        </h4>
                    </>
                    }
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                                Valor inicial (R$ R$ R$)
                            </label>
                            <div className="mt-2">
                                <input
                                    id="initial"
                                    name="initial"
                                    type="number"
                                    onChange={(e) => { setSimpleTaxValues({ ...simpleTaxValues, initial: parseInt(e.target.value) }) }}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark: text-gray-200 "
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                                    Taxa de juros (%)
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    name="text"
                                    type="number"
                                    onChange={(e) => { setSimpleTaxValues({ ...simpleTaxValues, tax: parseInt(e.target.value) }) }}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark: text-gray-200 "
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                                    Período ({isYear ? 'anual' : 'mensal'})
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    name="period"
                                    type="number"
                                    onChange={(e) => { setSimpleTaxValues({ ...simpleTaxValues, period: parseInt(e.target.value) }) }}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark: text-gray-200 "
                                />
                            </div>
                        </div>
                        <fieldset>
                            {/* <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend> */}
                            <p className="mt-1 text-sm leading-6 text-gray-600">Taxa e período em:</p>
                            <div className="mt-6 space-y-6">
                                <div className="flex items-center gap-x-3">
                                    <input
                                        checked={isYear}
                                        onClick={() => { setIsYear(true) }}
                                        id="anos"
                                        name="anos"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                                        anos
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        checked={!isYear}
                                        onClick={() => { setIsYear(false) }}
                                        id="meses"
                                        name="meses"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 dark:text-gray-200"
                                    />
                                    <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                                        meses
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Calcular
                            </button>
                        </div>
                    </form>


                </div>
            </div >
        </>
    )
}

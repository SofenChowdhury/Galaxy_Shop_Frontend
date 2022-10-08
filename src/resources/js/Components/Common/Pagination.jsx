import { InertiaLink } from "@inertiajs/inertia-react";

const Pagination = ({ links }) => {
    return (
        <div className="px-4 py-3 border-t dark:border-gray-700 bg-gray-50 text-gray-500 dark:text-gray-400 dark:bg-gray-800">
            <div className="flex mt-2 sm:mt-auto sm:justify-end">
                <nav aria-label="Table Navigation">
                    <ul className="pagination inline-flex items-center">
                        {links &&
                            links.map((el, i) => {
                                let url = el.url ? el.url : "";
                                let is_link = true;
                                if (url.length <= 1) {
                                    is_link = false;
                                }
                                let label = el.label;
                                if (label === "Next &raquo;") {
                                    label = (
                                        <svg
                                            class="h-3 w-3"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clip-rule="evenodd"
                                                fill-rule="evenodd"
                                            ></path>
                                        </svg>
                                    );
                                } else if (label === "&laquo; Previous") {
                                    label = (
                                        <svg
                                            class="h-3 w-3"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                clip-rule="evenodd"
                                                fill-rule="evenodd"
                                            ></path>
                                        </svg>
                                    );
                                }

                                return (
                                    <li
                                        key={i}
                                        className={
                                            el.active
                                                ? "active paginate_button page-item previous"
                                                : "paginate_button page-item previous"
                                        }
                                    >
                                        {is_link && (
                                            <InertiaLink
                                                as="button"
                                                type="button"
                                                className={
                                                    el.active
                                                        ? "align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-white bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 focus:shadow-outline-purple"
                                                        : "page-link align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:shadow-outline-gray dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
                                                }
                                                href={el.url}
                                            >
                                                {label}
                                            </InertiaLink>
                                        )}

                                        {!is_link && (
                                            <span className="page-link disabled">
                                                {label}
                                            </span>
                                        )}
                                    </li>
                                );
                            })}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Pagination;

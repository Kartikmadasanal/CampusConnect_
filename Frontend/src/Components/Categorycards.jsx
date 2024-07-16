import categories from "../Categorie/Category"

import { Link } from 'react-router-dom';
function Categorycards() {
    const category = "All"

    return (
        <div className=" mt-5 w-[80%] md:w-[50rem] xl:w-[80rem]" id="blogs">
            {/* <h1 className="text-3xl sm:text-4xl">Categories</h1> */}
            <ul className="flex gap-3 flex-wrap leading-loose">
                <li>
                    <Link
                        to={`/`}
                        className={"px-4 py-[6px] shadow-md rounded-full cursor-pointer text-white bg-zinc-800" }
                    >                 All
                    </Link>
                </li>
                {categories.map((items, index) => {

                    return (
                        <li key={index}>
                            <Link
                                to={`/?category=${items}`}
                                className={`px-4 py-[6px] shadow-md rounded-full cursor-pointer ${category === items
                                    ? "bg-white text-black"
                                    : "text-white bg-zinc-800"
                                    }`}
                            >                  {(items)}

                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default Categorycards;

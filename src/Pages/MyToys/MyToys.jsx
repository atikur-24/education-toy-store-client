import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import MyToyRow from "./MyToyRow";
import TopBanner from "../Shared/TopBanner/TopBanner";
import useTitle from "../../hooks/useTitle.";

const MyToys = () => {
    const { user } = useContext(AuthContext);
    useTitle('My Toys')
    const [myToys, setMyToys] = useState([]);
    const [controls, setControls] = useState(true)
    
    const url = `https://edu-toys-server-eight.vercel.app/toys?email=${user?.email}`;

    useEffect( () => {
        fetch(url)
            .then(res => res.json())
            .then(data => setMyToys(data))
    }, [url, controls] )

    return (
        <section className="my-container">
            <TopBanner>
                My Toys
            </TopBanner>
            <div className="overflow-x-auto w-full mt-20">
                <table className="table w-full">
                    <thead>
                        <tr className="text-[#003366]">
                            <th className="text-sm">Toy Image</th>
                            <th className="text-sm">Toy Name</th>
                            <th className="text-sm">Sub-category</th>
                            <th className="text-sm">Price</th>
                            <th className="text-sm">Available QTY</th>
                            <th className="text-sm">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myToys?.map(myToy => <MyToyRow key={myToy._id} myToy={myToy} controls={controls} setControls={setControls} />)
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default MyToys;
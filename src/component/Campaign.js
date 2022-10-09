import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Header from "./Header";

const API = 'https://zocketbackend.herokuapp.com'

const Campaign = () => {
  const [campaigns, setCampigns] = useState([]);
  const [platform, setPlatform] = useState([]);
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");

  const getCampaigns = async () => {
    try {
      let res = await axios.get(`${API}/api/campaigns`);
      if (res.data.length) {
        setCampigns([...res.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCampaigns();
  }, []);

  const deleteHandler = async (id) => {
    try {
      let res = await axios.delete(`${API}/api/campaigns/${id}`);
      console.log(res);
      let campaign_new = campaigns.filter((camp) => camp._id !== id);
      setCampigns([...campaign_new]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (platform) {
      let result = campaigns.filter((camp) => camp.platform === platform);
      setResult(result);
    } else {
      setResult([]);
    }
  }, [platform, campaigns, search]);

  useEffect(() => {
    if (search) {
      let result = campaigns.filter(
        (camp) =>
          camp.name.toLowerCase().includes(search) ||
          camp.location.toLowerCase().includes(search) ||
          camp.platform.toLowerCase().includes(search) ||
          camp.sdate.includes(search)
      );
      setResult(result);
    }
  }, [search, campaigns]);

  return (
    <div className="campaign_root">
      <Header></Header>
      <div className="row">
        <div className="col-8">
          <h1>Your Campigns</h1>
          <h6>Check the list of campigns you created</h6>
        </div>
        <div className="col-3 d-flex justify-content-center align-items-center">
          <Link to="/selection1">
            <button className="btn button-1 d-flex justify-content-center align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                fill="none"
                viewBox="0 0 21 21"
              >
                <path
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M10.5 19.25c4.813 0 8.75-3.938 8.75-8.75 0-4.813-3.938-8.75-8.75-8.75-4.813 0-8.75 3.938-8.75 8.75 0 4.813 3.938 8.75 8.75 8.75zM7 10.5h7M10.5 14V7"
                ></path>
              </svg>
              &nbsp; Create new Campaign
            </button>
          </Link>
        </div>
      </div>
      <section className="campaign_table">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-6">
            <div className="search_main">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="gray"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M11 20a9 9 0 100-18 9 9 0 000 18zM18.93 20.69c.53 1.6 1.74 1.76 2.67.36.85-1.28.29-2.33-1.25-2.33-1.14-.01-1.78.88-1.42 1.97z"
                ></path>
              </svg>
              <input
                type="text"
                className="search_input"
                placeholder="Search for the campaign"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="col-6 d-flex justify-content-end align-items-center">
            <span className="table_filter_header">Platform: &nbsp;</span>
            <select
              className="table_filter_select"
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="">All Platform </option>
              <option value="Google">Google</option>
              <option value="FB">FB</option>
              <option value="Youtube">Youtube</option>
              <option value="Instagram">Instagram</option>
            </select>
          </div>
        </div>

        <div className="row table_main">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">On/Off</th>
                <th scope="col">Campaign</th>
                <th scope="col">Date Range</th>
                <th scope="col">Budget</th>
                <th scope="col">Location</th>
                <th scope="col">Platform</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {result.length > 0
                ? result.map((camp, i) => (
                    <tr key={i}>
                      <td>
                        <label className="switch">
                          <input type="checkbox" />
                          <span className="slider round"></span>
                        </label>
                      </td>

                      <td>{camp.name}</td>
                      <td>
                        {moment(camp.sdate).format("DD/MM/YY")} -{" "}
                        {moment(camp.edate).format("DD/MM/YY")}
                      </td>

                      <td>Rs. {camp.budget}</td>
                      <td>{camp.location}</td>
                      <td>{camp.platform}</td>
                      <td>{camp.status}</td>
                      <td>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="21"
                          height="21"
                          fill="none"
                          viewBox="0 0 21 21"
                          onClick={() => deleteHandler(camp._id)}
                          style={{ cursor: "pointer" }}
                        >
                          <path
                            stroke="#FC3F3F"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M18.375 5.232a88.988 88.988 0 00-8.768-.437c-1.732 0-3.464.087-5.197.262l-1.785.175M7.438 4.349l.192-1.147c.14-.83.245-1.452 1.724-1.452h2.292c1.479 0 1.593.656 1.724 1.461l.193 1.138M16.494 7.998l-.569 8.81c-.096 1.375-.175 2.442-2.616 2.442H7.69c-2.441 0-2.52-1.067-2.616-2.441l-.569-8.811M9.039 14.438h2.913M8.313 10.938h4.374"
                          ></path>
                        </svg>
                      </td>
                    </tr>
                  ))
                : campaigns.length > 0
                ? campaigns.map((camp, i) => (
                    <tr key={i}>
                      <td>
                        <label className="switch">
                          <input type="checkbox" />
                          <span className="slider round"></span>
                        </label>
                      </td>

                      <td>{camp.name}</td>
                      <td>
                        {moment(camp.sdate).format("DD/MM/YY")} -{" "}
                        {moment(camp.edate).format("DD/MM/YY")}
                      </td>

                      <td>Rs. {camp.budget}</td>
                      <td>{camp.location}</td>
                      <td>{camp.platform}</td>
                      <td>{camp.status}</td>
                      <td>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="21"
                          height="21"
                          fill="none"
                          viewBox="0 0 21 21"
                          onClick={() => deleteHandler(camp._id)}
                          style={{ cursor: "pointer" }}
                        >
                          <path
                            stroke="#FC3F3F"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M18.375 5.232a88.988 88.988 0 00-8.768-.437c-1.732 0-3.464.087-5.197.262l-1.785.175M7.438 4.349l.192-1.147c.14-.83.245-1.452 1.724-1.452h2.292c1.479 0 1.593.656 1.724 1.461l.193 1.138M16.494 7.998l-.569 8.81c-.096 1.375-.175 2.442-2.616 2.442H7.69c-2.441 0-2.52-1.067-2.616-2.441l-.569-8.811M9.039 14.438h2.913M8.313 10.938h4.374"
                          ></path>
                        </svg>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Campaign;

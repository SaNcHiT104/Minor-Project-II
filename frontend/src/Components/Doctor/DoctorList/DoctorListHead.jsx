import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./DoctorListHead.module.css";
import DoctorCard from "./DoctorCard";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../../../UI/LoadingIndicator.jsx";
import ErrorBlock from "../../../UI/ErrorBlock.jsx";
import { fetchDoctorList } from "../../../util/patient.js";

export default function DoctorListHead() {
  const [disease, setDisease] = useState();
  const [location, setLocation] = useState();
  const [rating, setRating] = useState();
  useEffect(() => {}, [disease, location, rating]);
  // /patient/me/doctor_list
  // console.log(doctorprofile);'
  const { data, isPending, isError, error } = useQuery({
    queryFn: () => fetchDoctorList(),
    queryKey: ["doctorlist"],
  });

  let content;

  if (isPending) {
    content = (
      <div className="ringCenter">
        <LoadingIndicator />;
      </div>
    );
  }
  if (isError) {
    content = (
      <ErrorBlock
        title={"Was not able to fetch appointments"}
        message={error.info?.message || "Failed to fetch "}
      />
    );
  }
  if (data) {
    content = data.doctors?.map((obj) => {
      return (
        <DoctorCard
          id={obj._id}
          name={obj.name}
          post={obj.gender}
          field={""}
          sl={[]}
          ql={[]}
        />
      );
    });
  }
  return (
    <div className={styles.doctorlisthead}>
      <div className={styles.Liststartpic}>
        <div className={styles.doctorlist_image}>
          <motion.img
            src="https://www.medanta.org/storage/banners/October2023//lCBUkH43Vhj5oHvd5gdFVjZjoh0kiy-metaRmluZCBhIGRvY3Rvci5qcGc=-.jpg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          ></motion.img>
        </div>
        <motion.div
          className={styles.doctortext}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Medical Experts
        </motion.div>
        <div className={styles.locationlist}>
          <motion.select
            className={styles.select}
            name="disease"
            whileHover={{ scale: 1.1 }}
          >
            <option value="" onClick={() => setDisease(null)}>Select Speciality</option>
            <option value="ENT" onClick={() => setDisease("ENT")}>
              ENT
            </option>
            <option value="Oncologist" onClick={() => setDisease("Oncologist")}>
              Oncologist
            </option>
            <option value="Physician" onClick={() => setDisease("Physician")}>
              Physician
            </option>
          </motion.select>

          <motion.select
            className={styles.select}
            name="location"
            whileHover={{ scale: 1.1 }}
          >
            <option value="">Select Location</option>
            <option value="Gurgram" onClick={() => setLocation("Gurugram")}>
              Gurgram
            </option>
            <option value="Patna" onClick={() => setLocation("Patna")}>
              Patna
            </option>
            <option value="Delhi" onClick={() => setLocation("Delhi")}>
              Delhi
            </option>
          </motion.select>

          <motion.select
            className={styles.select}
            name="rating"
            whileHover={{ scale: 1.1 }}
          >
            <option value="" onClick={() => setRating(null)}>
              Select Rating
            </option>
            <option value="4+" onClick={() => setRating(4)}>
              4.0+
            </option>
          </motion.select>
        </div>
      </div>
      <div className={styles["Doctor-display"]}>{content}</div>
    </div>
  );
}

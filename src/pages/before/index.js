import React, { useState, useEffect, version } from "react";
import { MDBBtn, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

import LANG_DATA from "./data/LanguagesData.json";
import SECTION_DATA from "./data/SectionsData.json";

import "./styles.css";
import { FormControl, InputLabel, NativeSelect } from "@mui/material";

export default function Before(props) {
  const [versionOptions, setVersionOptions] = useState([]);

  const [selectedLanguage, setSelectedLanguage] = useState({});
  const [selectedVersion, setSelectedVersion] = useState({});
  const [selectedSection, setSelectedSection] = useState({});

  useEffect(() => {
    // const temp = LANG_DATA.map();
    const previewLang = localStorage.getItem("language");
    setSelectedLanguage({
      language: previewLang,
    });

    if (previewLang) {
      setVersionOptions(
        LANG_DATA.find((one) => one.language == previewLang).translations
      );
    }
    if (localStorage.getItem("version-short")) {
      setSelectedVersion({
        short_name: localStorage.getItem("version-short"),
        full_name: localStorage.getItem("version-full"),
      });
    }
    if (localStorage.getItem("section-value")) {
      setSelectedSection({
        value: localStorage.getItem("section-value"),
        label: localStorage.getItem("section-label"),
      });
    }
  }, []);

  const navigate = useNavigate();
  const onStart = () => {
    navigate(`/main/${selectedVersion.short_name}/${selectedSection.value}`);
  };

  return (
    <div className="px-96 pt-40 before-page h-96 bg-gradient-to-b from-teal-100">
      <MDBTypography
        id="language"
        tag={"h4"}
        className="font-sans hover:font-serif text-emerald-600 font-bold text-center text-5xl"
      >
        Please select Language, Version, Section of Bible.
      </MDBTypography>

        Language:
      <Select
        className="mb-1"
        placeholder={"Please select"}
        options={LANG_DATA}
        getOptionLabel={(option) => option.language}
        getOptionValue={(option) => option.language}
        onChange={(e) => {
          setSelectedLanguage(e);
          localStorage.setItem("language", e.language);
          setVersionOptions(e.translations);
          setSelectedVersion({});
        }}
        value={
          localStorage.getItem("language") ? selectedLanguage : "Please select"
        }
        required
      />
      {!selectedLanguage.language && (
        <p className="text-danger">Select the Language</p>
      )}

      <label htmlFor="language" className="mb-1">
        Version:
      </label>
      <Select
        className="mb-4"
        placeholder={"Please select"}
        options={versionOptions}
        getOptionLabel={(option) =>
          option.short_name && `${option.short_name} - ${option.full_name}`
        }
        getOptionValue={(option) => option.short_name}
        value={selectedVersion.short_name ? selectedVersion : "Please select"}
        onChange={(val) => {
          setSelectedVersion(val);
          localStorage.setItem("version-short", val.short_name);
          localStorage.setItem("version-full", val.full_name);
        }}
        required
      />
      {!selectedVersion.short_name && (
        <p className="text-danger">Select the Version</p>
      )}

      <label htmlFor="language" className="mb-1">
        Section of Bible:
      </label>
      <Select
        className="mb-4"
        placeholder={"Please select"}
        options={SECTION_DATA}
        getOptionLabel={(option) => option.bible}
        getOptionValue={(option) => option.bible}
        value={
          localStorage.getItem("section-label")
            ? selectedSection
            : "Please select"
        }
        onChange={(val) => {
          setSelectedSection(val);
          localStorage.setItem("section-value", val.value);
          localStorage.setItem("section-label", val.label);
        }}
      />
      {!selectedSection.value && (
        <p className="text-danger">Select the Bible</p>
      )}

      <div className="text-center">
        <MDBBtn
          type="submit"
          onClick={onStart}
          disabled={
            !(
              selectedLanguage.language &&
              selectedVersion.short_name &&
              selectedSection.value
            )
          }
        >
          Start!
        </MDBBtn>
      </div>
    </div>
  );
}

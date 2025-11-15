import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import "../assets/css/Instructions.css";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select
      className="language-dropdown"
      onChange={changeLanguage}
      value={i18n.language.split("-")[0]}
    >
      <option value="en">English</option>
      <option value="hi">हिन्दी (Hindi)</option>
      <option value="te">తెలుగు (Telugu)</option>
      <option value="ja">日本語 (Japanese)</option>
    </select>
  );
};

const Instruction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const test = location.state;
  const [checked, setChecked] = useState(false);
  const { t } = useTranslation();

  const handleStart = () => {
    if (checked) {
      const el = document.documentElement;
      const fullscreen =
        el.requestFullscreen ||
        el.mozRequestFullScreen ||
        el.webkitRequestFullscreen ||
        el.msRequestFullscreen;

      (fullscreen ? fullscreen.call(el) : Promise.resolve()).finally(() => {
        const basePath = location.pathname.replace("/instructions", "");
        navigate(`${basePath}/exam`, { state: test });
      });
    }
  };

  if (!test) {
    return (
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        {t("noTestData")}
      </p>
    );
  }

  return (
    <div className="content">
      {/* HEADER */}
      <div className="header-row">
        <h2>{t("instructionsTitle")}</h2>
        <LanguageSelector />
      </div>

      {/* INSTRUCTION LIST */}
      <ol>
        <li>
          <Trans i18nKey="instructionDate" values={{ date: test.date }}>
            This assessment is scheduled on <b>{test.date}</b>.
          </Trans>
        </li>
        <li>{t("instructionTimer")}</li>
        <li>{t("instructionPalette")}</li>
        <li>{t("instructionPaletteNav")}</li>
        <li>
          <Trans i18nKey="instructionSaveNext">
            Click <b>Save and Next</b> to save your answer.
          </Trans>
        </li>
        <li>{t("instructionSelect")}</li>
        <li>{t("instructionDeselect")}</li>
        <li>{t("instructionChange")}</li>
        <li>
          <Trans i18nKey="instructionSectionNav">
            After clicking <b>Save and Next</b>, you move to the next section.
          </Trans>
        </li>
        <li>
          <Trans i18nKey="instructionCoding">
            For <b>Coding Questions</b>, click <b>Submit Code</b>.
          </Trans>
        </li>
        <li>
          <Trans
            i18nKey="instructionTestDetails"
            values={{
              questions: test.questions,
              marks: test.marks,
              time: test.time,
            }}
          >
            <b>Test Details:</b> {test.questions} Questions | {test.marks} Marks
            | Duration: {test.time} mins
          </Trans>
        </li>
      </ol>

      <hr />

      {/* DECLARATION CHECKBOX */}
      <div className="declaration-row">
        <input
          type="checkbox"
          className="box"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <p className="paragraph">{t("declaration")}</p>
      </div>

      {/* BUTTON */}
      <div className="button-wrapper">
        <button
          className={`submit ${checked ? "active" : "disabled"}`}
          onClick={handleStart}
          disabled={!checked}
        >
          {t("startAssessment")}
        </button>
      </div>
    </div>
  );
};

export default Instruction;

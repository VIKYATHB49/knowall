import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select
      className="language-dropdown"
      onChange={changeLanguage}
      value={i18n.language.split('-')[0]}
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

      (fullscreen ? fullscreen.call(el) : Promise.resolve())
        .finally(() => {
          const basePath = location.pathname.replace('/instructions', '');
          navigate(`${basePath}/exam`, { state: test });
        });
    }
  };

  if (!test) {
    return <p style={{ textAlign: 'center', marginTop: '20px' }}>{t('noTestData')}</p>;
  }

  return (
    <div className="content">

      {/* ONLY DROPDOWN CSS */}
      <style>{`
        .header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .language-dropdown {
          width: 160px;
          padding: 8px 12px;
          font-size: 14px;
          border-radius: 6px;
          border: 1px solid #ccc;
          background: #fff;
        }

        @media (max-width: 768px) {
          .header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .language-dropdown {
            width: 100%;
            font-size: 15px;
          }
        }
      `}</style>

      {/* HEADER: Title left + Dropdown right */}
      <div className="header-row">
        <h2>{t('instructionsTitle')}</h2>
        <LanguageSelector />
      </div>

      <ol>
        <li>
          <Trans i18nKey="instructionDate" values={{ date: test.date }}>
            This assessment is scheduled on <b>{test.date}</b>.
          </Trans>
        </li>
        <li>{t('instructionTimer')}</li>
        <li>{t('instructionPalette')}</li>
        <li>{t('instructionPaletteNav')}</li>
        <li>
          <Trans i18nKey="instructionSaveNext">
            Click <b>Save and Next</b> to save your answer.
          </Trans>
        </li>
        <li>{t('instructionSelect')}</li>
        <li>{t('instructionDeselect')}</li>
        <li>{t('instructionChange')}</li>
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
              time: test.time
            }}
          >
            <b>Test Details:</b> {test.questions} Questions | {test.marks} Marks | Duration: {test.time} mins
          </Trans>
        </li>
      </ol>

      <hr />

      <div>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />{" "}
        {t('declaration')}
      </div>

      <button
        onClick={handleStart}
        disabled={!checked}
      >
        {t('startAssessment')}
      </button>
    </div>
  );
};

export default Instruction;

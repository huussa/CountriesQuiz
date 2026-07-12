"use client";

import styles from "../page.module.css";
import { useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next';


function ReturnButton({ href, text = "Return", data }) {
    const router = useRouter();
    const { t } = useTranslation();


    function handleClick() {
        href ? router.push(href) : window.location.reload();
    }

    return (
        <span 
            className={styles.nextQuestionButton}
            onClick={handleClick}
        >
            {t("buttons.return")}
        </span>
    );
}

export default ReturnButton;
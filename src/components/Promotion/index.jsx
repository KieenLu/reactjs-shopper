import React from "react";
import { useTranslate } from "../TranslateProvider";

const Promotion = () => {
  const { t } = useTranslate();
  return (
    <div className="py-3 bg-dark bg-pattern @@classList">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Text */}
            <div className="text-center text-white">
              <span className="heading-xxs letter-spacing-xl">
                ⚡️ {t("deal.2/9")} ⚡️
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotion;

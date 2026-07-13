import { useTranslation } from "react-i18next";
import { Brain, Languages, Lightbulb, Target } from "lucide-react";

const AIAssistantPreferences = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="w-5 h-5 text-kashf-blue" />
        <h2 className="text-lg font-semibold text-white">{t("profile.aiAssistant.title")}</h2>
      </div>

      <div className="space-y-6">
        {/* Advice Language */}
        <div>
          <h3 className="text-sm font-medium text-neutral-300 mb-3 flex items-center gap-2">
            <Languages className="w-4 h-4" />
            {t("profile.aiAssistant.adviceLanguage")}
          </h3>
          <div className="flex gap-2">
            <button className="flex-1 px-4 py-2 rounded-lg bg-kashf-blue text-kashf-bg font-medium text-sm">
              {t("language.ar", { defaultValue: "Arabic" })}
            </button>
            <button className="flex-1 px-4 py-2 rounded-lg bg-kashf-bg/50 border border-kashf-border/50 text-neutral-300 font-medium text-sm hover:border-kashf-blue/30 transition-colors">
              {t("language.en", { defaultValue: "English" })}
            </button>
          </div>
        </div>

        {/* Advice Style */}
        <div>
          <h3 className="text-sm font-medium text-neutral-300 mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            {t("profile.aiAssistant.adviceStyle")}
          </h3>
          <div className="space-y-2">
            <button className="w-full px-4 py-3 rounded-lg bg-kashf-blue text-kashf-bg font-medium text-sm text-left rtl:text-right">
              {t("profile.aiAssistant.shortTips")}
            </button>
            <button className="w-full px-4 py-3 rounded-lg bg-kashf-bg/50 border border-kashf-border/50 text-neutral-300 font-medium text-sm text-left rtl:text-right hover:border-kashf-blue/30 transition-colors">
              {t("profile.aiAssistant.detailedExplanations")}
            </button>
          </div>
        </div>

        {/* Saving Goal */}
        <div>
          <h3 className="text-sm font-medium text-neutral-300 mb-3 flex items-center gap-2">
            <Target className="w-4 h-4" />
            {t("profile.aiAssistant.savingGoal")}
          </h3>
          <div className="space-y-2">
            <button className="w-full px-4 py-3 rounded-lg bg-kashf-bg/50 border border-kashf-border/50 text-neutral-300 font-medium text-sm text-left rtl:text-right hover:border-kashf-blue/30 transition-colors">
              {t("profile.aiAssistant.maximumSavings")}
            </button>
            <button className="w-full px-4 py-3 rounded-lg bg-kashf-blue text-kashf-bg font-medium text-sm text-left rtl:text-right">
              {t("profile.aiAssistant.balancedUsage")}
            </button>
            <button className="w-full px-4 py-3 rounded-lg bg-kashf-bg/50 border border-kashf-border/50 text-neutral-300 font-medium text-sm text-left rtl:text-right hover:border-kashf-blue/30 transition-colors">
              {t("profile.aiAssistant.comfortFirst")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPreferences;

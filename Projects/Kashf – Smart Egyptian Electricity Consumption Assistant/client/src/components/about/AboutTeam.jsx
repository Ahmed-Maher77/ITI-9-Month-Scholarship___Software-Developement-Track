import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { fadeUpVariants } from "../../utils/animations";
import SectionBadge from "../welcome/ui/SectionBadge";
import SectionHeading from "../welcome/ui/SectionHeading";


const LinkedinIcon = ({ className = "" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const MEMBERS = [
    { key: "maher",   photo: "/team_members/ahmed-maher-algohary.jpg", linkedin: "https://www.linkedin.com/in/ahmed-maher-algohary/" },
    { key: "rashad",  photo: "/team_members/mohamed-rashad.jpeg",  linkedin: "https://www.linkedin.com/in/mohamed-rashad-2bb024288/" },
    { key: "essam",   photo: "/team_members/ahmed-essam.jpeg",  linkedin: "https://www.linkedin.com/in/ahmed-essam-career2333/" },
    { key: "awadallah", photo: "/team_members/mohamed-awad.jpeg", linkedin: "https://www.linkedin.com/in/mohamed-awadallah-ma/" },
    { key: "yasser", photo: "/team_members/yasser-eid.jpg", linkedin: "https://www.linkedin.com/in/yasser-eid-18a45521a/" },
];

const TeamCard = ({ member }) => {
    const { t, i18n } = useTranslation();
    const isReady = i18n?.isInitialized && typeof t === 'function';

    if (!isReady) {
        return <div className="h-full animate-pulse bg-neutral-900/50 rounded-xl" />;
    }

    const name  = t(`about.team.members.${member.key}.name`);
    const title = t(`about.team.members.${member.key}.title`);

    return (
        <div className="group relative flex flex-col items-center gap-4 rounded-2xl border border-neutral-800 bg-[#0d0d12] p-6 transition-all duration-500 hover:border-kashf-blue/40 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(6,182,212,0.12)] h-full">
            {/* Hover glow */}
            <span aria-hidden className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-kashf-blue/8 via-kashf-light-blue/5 to-emerald-400/5" />
            <span aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-kashf-blue/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Avatar */}
            <div className="relative">
                <img
                    src={member.photo}
                    alt={name}
                    className="w-24 h-24 rounded-full object-cover border-3 border-kashf-blue/15 group-hover:border-kashf-blue/50 transition-colors duration-300"
                />
                {/* <span className="absolute -bottom-1 -end-1 w-6 h-6 rounded-full bg-kashf-blue flex items-center justify-center shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-black" />
                </span> */}
            </div>

            {/* Info */}
            <div className="relative z-10 text-center flex flex-col gap-3 mt-1 mb-3">
                <h3 className="text-neutral-100 font-bold text-base group-hover:text-kashf-light-blue transition-colors duration-300">{name}</h3>
                <p className="text-kashf-blue text-xs font-medium leading-[1.6]">{title}</p>
            </div>

            {/* LinkedIn */}
            <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 mt-auto inline-flex items-center gap-2 px-4 py-2 rounded-full border border-kashf-border bg-kashf-surface text-neutral-400 text-xs font-medium hover:border-kashf-blue/50 hover:text-kashf-blue hover:bg-kashf-blue/5 transition-all duration-200"
                aria-label={`${name} on LinkedIn`}
            >
                <LinkedinIcon className="w-3.5 h-3.5" />
                LinkedIn
            </a>
        </div>
    );
};

const AboutTeam = () => {
    const { t } = useTranslation();

    return (
        <section id="about-team" className="py-20 md:py-28 md:pt-24 border-b border-kashf-border overflow-hidden">
            <motion.div 
                className="max-w-7xl xl:max-w-[1400px] mx-auto px-5 sm:px-8"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
            >
                <SectionHeading
                    align="center"
                    title={t("about.team.title")}
                    accent={t("about.team.titleAccent")}
                    subtitle={t("about.team.subtitle")}
                    className="mb-14"
                    baseDelay={0}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-20">
                    {MEMBERS.map((member, i) => (
                        <motion.div key={member.key} variants={fadeUpVariants} custom={i} className="h-full">
                            <TeamCard member={member} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default AboutTeam;

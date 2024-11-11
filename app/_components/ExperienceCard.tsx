import { motion } from "framer-motion";
import { Experience } from "@/app/_lib/constants";
import Image from "next/image";

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
    className="flex items-start space-x-4"
  >
    {/* Timeline circle with logo */}
    <div className="relative w-12 h-12 md:w-16 md:h-16 bg-white rounded-full overflow-hidden mt-2 -ml-10 flex-shrink-0 p-1">
      <div className="relative w-full h-full">
        <Image
          src={experience.logo}
          alt={`${experience.company} logo`}
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>

    {/* Experience box */}
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-4 w-full">
      <div>
        <h3 className="text-lg font-bold">{experience.company}</h3>
        <p className="text-sm text-gray-200 text-gray-700 dark:text-gray-300">
          {experience.dates}
        </p>
        <p className="text-sm font-semibold">{experience.position}</p>
      </div>
      <ul className="list-disc ml-8 mt-2 space-y-1 text-gray-700 dark:text-gray-100">
        {experience.description.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  </motion.div>
);

export default ExperienceCard;

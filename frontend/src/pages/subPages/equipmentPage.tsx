import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import MainPageLayout from '../../components/Layouts/MainPageLayout.tsx';
import Pagination from '../../components/Pagination/Pagination.tsx';
import EquipmentCard from '../../components/SubPages/EquipmentCard.tsx';
import { AuthContext } from '../../context/AuthContext.tsx';
import useEquipments from '../../hooks/useEquipments.ts';
import { useToast } from '../../hooks/useToast.ts';
import { Equipment } from '../../interfaces/EquipmentProps.ts';
import useUserEquipments from '../../hooks/useUserEquipments.ts';

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

const EquipmentPage = () => {
  const { userId } = useContext(AuthContext);
  const { showToast } = useToast();
  const { userEquipments, loading, addToEquipments, removeFromEquipments } = useUserEquipments();

  const [direction, setDirection] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const equipmentsPerPage = 20;
  const maxEquipments = 10;

  const { equipments: fetchedEquipments, totalEquipments: fetchedTotalEquipments } = useEquipments(
    currentPage,
    equipmentsPerPage
  );

  const [equipments, setEquipments] = useState<Equipment[]>(fetchedEquipments);

  useEffect(() => {
    setEquipments(fetchedEquipments);
  }, [currentPage, fetchedEquipments]);

  // chatgpt prompt line 111 to 145
  const handleEquipmentChange = async (equipId: string, checked: boolean, equipment: Equipment) => {
    try {
      if (checked) {
        // Check if user already has the maximum number of equipments
        if (userEquipments.length >= maxEquipments) {
          showToast({
            message: 'Cannot add any more items, inventory is full',
            type: 'warning',
            duration: 2000,
          });
          return; // Early return to prevent adding the equipment
        }

        // Proceed to add equipment if within limits
        await addToEquipments(equipId);
        showToast({
          message: `${equipment.name} was added to your equipments!`,
          type: 'success',
          duration: 3000,
        });
      } else {
        // Handle equipment removal
        await removeFromEquipments(equipId);
        showToast({
          message: `${equipment.name} was removed from your equipments!`,
          type: 'success',
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error updating equipment:', error);
    }
  };

  const totalPages = Math.ceil(fetchedTotalEquipments / equipmentsPerPage);
  const handlePageChange = (newDirection: number) => {
    const newPage = currentPage + newDirection;
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setDirection(newDirection);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <MainPageLayout>
      <main className="main before:bg-equipments">
        <div className="black-overlay" />
        <div className="wrapper py-20 min-w-[70%] flex gap-y-32 2xl:gap-0 mt-10 items-center justify-center">
          <h1 className="header">Equipments</h1>
          <section className="w-full h-9/10 overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentPage}
                className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-6 p-4"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {equipments.map((equipment, index) => {
                  return (
                    <EquipmentCard
                      key={index}
                      equipment={equipment}
                      isChecked={userEquipments.some((userEquip) => userEquip.id === equipment.id)}
                      userId={userId}
                      onChange={handleEquipmentChange}
                      disabled={userEquipments.length >= maxEquipments}
                    />
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </section>
          <Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
        </div>
      </main>
    </MainPageLayout>
  );
};
export default EquipmentPage;

import { Dialog, DialogContent, IconButton } from '@mui/material';
import { useState } from 'react';
import { FiHelpCircle, FiX } from 'react-icons/fi';
import raceGif from '../../assets/images/race.gif';
import classGif from '../../assets/images/class.gif';
import abilityScoreGif from '../../assets/images/abilityscore.gif';
import { Link } from 'react-router-dom';

const TutorialModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Question Mark Button */}
      <IconButton
        onClick={handleClickOpen}
        sx={{
          position: 'absolute',
          top: { xs: '3.5%', sm: '3.5%', md: '3.5%', lg: '5%', xl: '5%' },
          right: '5%',
          color: 'white',
          backgroundColor: '#DB3232',
          '&:hover': {
            backgroundColor: 'black',
            color: '#DB3232',
          },
        }}
      >
        <FiHelpCircle size={35} />
      </IconButton>

      {/* Modal Dialog */}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          sx: {
            paddingTop: 10,
            backgroundColor: 'black',
            color: 'white',
            position: 'relative',
          },
        }}
      >
        {/* "X" Close Button */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: '1%',
            right: '1%',
            color: 'white',
            '&:hover': {
              color: '#DB3232',
            },
          }}
        >
          <FiX size={40} />
        </IconButton>

        {/* Scrollable Content */}
        <DialogContent className="w-full gap-20 flex flex-col">
          <section className="w-full flex flex-col items-center gap-5">
            <h2 className="header bold">Race</h2>
            <p className="text">The race of your character determines only their appearance in the game. It allows you
              to
              customize how
              your character looks, but it doesn’t affect gameplay, abilities, or stats. Choose the race that best
              fits
              the visual style you want for your character. Use the left and right arrows to navigate between
              different
              races. To learn more about
              each race,
              click <Link to="/project2/race" className="underline text-customRed">here</Link>.</p>
            <img src={raceGif} alt="Race tutorial" />
          </section>
          <section className="w-full flex flex-col items-center gap-5">
            <h2 className="header">Class</h2>
            <p className="text">The class defines your character’s role in the game, determining their skills and HP.
              Use the left and right arrows to navigate between
              different classes.
              Each class specializes in different aspects of gameplay, like animal handling or survival. Some ability
              scores require specific skills, and if your class does not provide at least one of the required skills,
              you will not be able to increase that ability score, and it will remain at zero. However, if an ability
              score does not require any specific skills, you are free to increase it as you like. To learn more about
              each class’s HP and available skills,
              click <Link to="/project2/class" className="underline text-customRed">here</Link>.</p>
            <img src={classGif} alt="Class tutorial" />
          </section>
          <section className="w-full flex flex-col items-center gap-5">
            <h2 className="header">Ability scores</h2>
            <p className="text">These scores define your character’s basic attributes, affecting everything from combat
              effectiveness to interactions with others in the game. You can modify your ability scores using the
              counters provided. As mentioned, some ability scores require specific skills, and your class must have at
              least one of these skills in order to increase that ability score. To learn
              more about
              the ability scores and their required skills,
              click <Link to="/project2/abilityscore" className="underline text-customRed">here</Link>.</p>
            <img src={abilityScoreGif} alt="Ability Score tutorial" />
          </section>
          <section className="w-full flex flex-col items-center gap-5">
            <h2 className="header">Equipments</h2>
            <p className="text">Here you can see all the equipment you have equipped. Your choice of equipment can
              significantly impact your character’s effectiveness in combat and exploration. You can equip up to 10
              items. To view all available equipment, see what you’re currently using, and modify your selection,
              click <Link to="/project2/equipment" className="underline text-customRed">here</Link>.</p>
          </section>


        </DialogContent>
      </Dialog>
    </>
  );
};

export default TutorialModal;
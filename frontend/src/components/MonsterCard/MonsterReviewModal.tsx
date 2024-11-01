import { useMutation, useQuery } from '@apollo/client';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { ADD_REVIEW, GET_MONSTER_REVIEWS, UPDATE_REVIEW } from '../../../../backend/src/graphql/queries';
import { AuthContext } from '../../context/AuthContext';
import { useToast } from '../../hooks/useToast';
import { ReviewFormType, ReviewType } from '../../interfaces/ReviewProps.ts';
import ReviewSlider from './ReviewSlider.tsx';
import ReviewTextField from './ReviewTextField.tsx';

const MonsterReviewModal = ({ name, monsterId, image }: ReviewFormType) => {
  const { userId } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [difficulty, setDifficulty] = useState(50);
  const [description, setDescription] = useState('');
  const [originalDifficulty, setOriginalDifficulty] = useState(50);
  const [originalDescription, setOriginalDescription] = useState('');
  const { showToast } = useToast();

  const { data } = useQuery(GET_MONSTER_REVIEWS, { variables: { monsterId } });
  const existingReview = data?.monster?.reviews.find((review: ReviewType) => review.user.id === userId);

  const [addReview] = useMutation(ADD_REVIEW, {
    refetchQueries: [{ query: GET_MONSTER_REVIEWS, variables: { monsterId } }],
  });

  const [updateReview] = useMutation(UPDATE_REVIEW, {
    refetchQueries: [{ query: GET_MONSTER_REVIEWS, variables: { monsterId } }],
  });

  useEffect(() => {
    if (existingReview) {
      setDescription(existingReview.description);
      setDifficulty(existingReview.difficulty);
      setOriginalDescription(existingReview.description);
      setOriginalDifficulty(existingReview.difficulty);
    }
  }, [existingReview]);

  const handleClickOpen = () => {
    if (existingReview) {
      setEditMode(true);
    } else {
      setDescription('');
      setDifficulty(50);
      setEditMode(false);
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    if (editMode) {
      setDescription(originalDescription);
      setDifficulty(originalDifficulty);
    } else {
      setDescription('');
      setDifficulty(50);
    }
    setIsOpen(false);
    setEditMode(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!userId) {
      showToast({ message: 'You must be logged in to submit a review', type: 'error', duration: 3000 });
      return;
    }

    try {
      if (editMode && existingReview) {
        // Update existing review
        await updateReview({
          variables: {
            monsterId,
            reviewId: existingReview.id,
            review: { user: userId, difficulty, description },
          },
        });
        showToast({ message: `Review on ${name} updated`, type: 'success', duration: 3000 });
      } else {
        // Add new review
        await addReview({
          variables: {
            monsterId,
            review: { user: userId, difficulty, description },
          },
        });
        showToast({ message: `Review on ${name} submitted`, type: 'success', duration: 3000 });
      }
      setIsOpen(false);
    } catch (error) {
      console.error('Error submitting review:', error);
      showToast({ message: `Failed to submit review on ${name}`, type: 'error', duration: 3000 });
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          color: 'white',
          borderColor: '#DB3232',
          backgroundColor: '#DB3232',
          padding: '0.2vw 0.5vw',
          minWidth: 'unset',
          minHeight: 'unset',
          height: 'auto',
          lineHeight: 'normal',
          borderRadius: '4px',
          boxSizing: 'border-box',
          '&:hover': {
            borderColor: '#DB3232',
            backgroundColor: 'black',
            color: '#DB3232',
          },
          fontFamily: 'MedievalSharp',
          fontSize: {
            xs: '3.5vw',
            sm: '2vw',
            md: '1.3vw',
            lg: '1.2vw',
            xl: '1vw',
          },
          textTransform: 'none',
        }}
      >
        Review
      </Button>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          sx: {
            width: { xs: '100vw', sm: '95vw', md: '90vw', lg: '80vw', xl: '70vw' },
            height: { xs: '100vh', sm: '85vh', md: '85vh', lg: '60vh', xl: '70vh' },
            maxWidth: 'none',
            padding: { xs: 0, sm: 4 },
            backgroundColor: 'black',
          },
        }}
      >
        <DialogContent className="flex flex-col xl:flex-row xl:items-center bg-black gap-6">
          <Box className="w-full xl:w-1/2 flex flex-col gap-[50px] xl:items-center">
            <img src={image} alt="Image of selected monster" className="w-full sm:w-3/4 xl:w-1/2 rounded" />
            <h2 className="sub-header text-white">Review of {name}</h2>
          </Box>
          <article className="flex flex-col gap-4 w-full xl:w-1/2">
            <DialogContentText sx={{ color: 'white', fontSize: '1.5rem', fontFamily: 'MedievalSharp' }}>
              Difficulty
            </DialogContentText>
            <ReviewSlider value={difficulty} onChange={(_, value) => setDifficulty(value as number)} />
            <ReviewTextField value={description} onChange={(e) => setDescription(e.target.value.slice(0, 300))} />
          </article>
        </DialogContent>

        <DialogActions className="bg-black">
          <Button
            onClick={handleClose}
            aria-label="Cancel-button"
            sx={{
              color: 'white',
              borderColor: 'white',
              '&:hover': {
                borderColor: '#DB3232',
                color: '#DB3232',
              },
              fontFamily: 'MedievalSharp',
              fontSize: '1.5rem',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            type="submit"
            aria-label="Save-button"
            sx={{
              color: 'white',
              borderColor: 'white',
              '&:hover': {
                borderColor: '#DB3232',
                color: '#DB3232',
              },
              fontFamily: 'MedievalSharp',
              fontSize: '1.5rem',
            }}
          >
            {editMode ? 'UPDATE' : 'SUBMIT'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MonsterReviewModal;

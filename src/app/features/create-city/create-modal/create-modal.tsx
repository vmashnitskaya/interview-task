import { Box, Button, IconButton, Modal, TextField } from '@mui/material';
import { memo, useCallback, useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { City } from 'src/app/types';
import { useAppDispatch, createCity } from 'src/app/store';
import { PopOver } from '../popover';

import classes from './create-modal.module.scss';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  padding: 4,
  maxHeight: '80vh',
  overflow: 'auto',
};

const initialValues: Omit<City, 'id'> = {
  name: '',
  country: '',
  latitude: 0,
  longitude: 0,
  population: 0,
  imageUrl: '',
  imageLargeUrl: '',
  description: '',
};

const limits = {
  latitude: { min: -90, max: 90, step: 0.0001 },
  longitude: { min: -180, max: 180, step: 0.0001 },
  population: { min: 0 },
};

const CitySchema = Yup.object().shape({
  name: Yup.string().required('City name is required'),
  country: Yup.string().required('Country is required'),
  latitude: Yup.number()
    .required('Latitude is required')
    .min(limits.latitude.min)
    .max(limits.latitude.max)
    .test('not-zero', 'Latitude cannot be 0', (value) => value !== 0),
  longitude: Yup.number()
    .required('Longitude is required')
    .min(limits.longitude.min)
    .max(limits.longitude.max)
    .test('not-zero', 'Longitude cannot be 0', (value) => value !== 0),
  population: Yup.number(),
  imageUrl: Yup.string()
    .url('Must be a valid URL')
    .required('Image URL is required'),
  imageLargeUrl: Yup.string()
    .url('Must be a valid URL')
    .required('Large Image URL is required'),
  description: Yup.string().required('Description is required'),
});

const CreateModalElement = ({ isOpen, onClose }: CreateModalProps) => {
  const displatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [popoverText, setPopoverText] = useState<string>('');

  const handleHintClick = (
    event: React.MouseEvent<HTMLElement>,
    text: string
  ) => {
    setAnchorEl(event.currentTarget);
    setPopoverText(text);
  };

  const handleClose = useCallback(() => {
    setAnchorEl(null);
    setPopoverText('');
  }, []);

  const onSubmit = (
    city: Omit<City, 'id'>,
    { resetForm }: FormikHelpers<Omit<City, 'id'>>
  ) => {
    displatch(createCity(city));
    resetForm();
    onClose();
  };
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Formik
          initialValues={initialValues}
          validationSchema={CitySchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, handleChange, values, touched, errors }) => (
            <Form>
              <Box display="flex" flexDirection="column" gap={2} maxWidth={400}>
                <div className={classes['input-container']}>
                  <TextField
                    label="City Name"
                    name="name"
                    placeholder="Minsk"
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />

                  <IconButton
                    size="small"
                    sx={{ ml: 0.5 }}
                    onClick={(event) => handleHintClick(event, 'Hint: Minsk')}
                  >
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </div>

                <div className={classes['input-container']}>
                  <TextField
                    label="Country"
                    name="country"
                    placeholder="Belarus"
                    value={values.country}
                    onChange={handleChange}
                    error={touched.country && Boolean(errors.country)}
                    helperText={touched.country && errors.country}
                  />
                  <IconButton
                    size="small"
                    sx={{ ml: 0.5 }}
                    onClick={(event) => handleHintClick(event, 'Hint: Belarus')}
                  >
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </div>

                <div className={classes['input-container']}>
                  <TextField
                    label="Latitude"
                    name="latitude"
                    type="number"
                    placeholder="53.9"
                    slotProps={{
                      htmlInput: {
                        step: limits.latitude.step,
                        min: limits.latitude.min,
                        max: limits.latitude.max,
                      },
                    }}
                    value={values.latitude}
                    onChange={handleChange}
                    error={touched.latitude && Boolean(errors.latitude)}
                    helperText={touched.latitude && errors.latitude}
                  />
                  <IconButton
                    size="small"
                    sx={{ ml: 0.5 }}
                    onClick={(event) => handleHintClick(event, 'Hint: 53.9')}
                  >
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </div>

                <div className={classes['input-container']}>
                  <TextField
                    label="Longitude"
                    name="longitude"
                    type="number"
                    placeholder="27.56"
                    slotProps={{
                      htmlInput: {
                        step: limits.longitude.step,
                        min: limits.longitude.min,
                        max: limits.longitude.max,
                      },
                    }}
                    value={values.longitude}
                    onChange={handleChange}
                    error={touched.longitude && Boolean(errors.longitude)}
                    helperText={touched.longitude && errors.longitude}
                  />
                  <IconButton
                    size="small"
                    sx={{ ml: 0.5 }}
                    onClick={(event) => handleHintClick(event, 'Hint: 27.56')}
                  >
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </div>

                <div className={classes['input-container']}>
                  <TextField
                    label="Population"
                    name="population"
                    type="number"
                    placeholder="2000000"
                    value={values.population}
                    onChange={handleChange}
                    error={touched.population && Boolean(errors.population)}
                    helperText={touched.population && errors.population}
                  />
                  <IconButton
                    size="small"
                    sx={{ ml: 0.5 }}
                    onClick={(event) => handleHintClick(event, 'Hint: 2000000')}
                  >
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </div>

                <div className={classes['input-container']}>
                  <TextField
                    label="Image URL"
                    name="imageUrl"
                    value={values.imageUrl}
                    onChange={handleChange}
                    error={touched.imageUrl && Boolean(errors.imageUrl)}
                    helperText={touched.imageUrl && errors.imageUrl}
                  />
                  <IconButton
                    size="small"
                    sx={{ ml: 0.5 }}
                    onClick={(event) =>
                      handleHintClick(
                        event,
                        'Hint: https://images.unsplash.com/photo-1597986775867-1d871fad81fc?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                      )
                    }
                  >
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </div>

                <div className={classes['input-container']}>
                  <TextField
                    label="Large Image URL"
                    name="imageLargeUrl"
                    value={values.imageLargeUrl}
                    onChange={handleChange}
                    error={
                      touched.imageLargeUrl && Boolean(errors.imageLargeUrl)
                    }
                    helperText={touched.imageLargeUrl && errors.imageLargeUrl}
                  />
                  <IconButton
                    size="small"
                    sx={{ ml: 0.5 }}
                    onClick={(event) =>
                      handleHintClick(
                        event,
                        'Hint: https://images.unsplash.com/photo-1597986775867-1d871fad81fc?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                      )
                    }
                  >
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </div>

                <div className={classes['input-container']}>
                  <TextField
                    label="Description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    multiline
                    minRows={3}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                  />
                  <IconButton
                    size="small"
                    sx={{ ml: 0.5 }}
                    onClick={(event) =>
                      handleHintClick(
                        event,
                        'Hint: A vibrant city known for its rich history, cultural landmarks, and beautiful architecture.'
                      )
                    }
                  >
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
        <PopOver anchorEl={anchorEl} onClose={handleClose} text={popoverText} />
      </Box>
    </Modal>
  );
};

export const CreateModal = memo(CreateModalElement);

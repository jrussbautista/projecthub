import React from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useIntl } from 'react-intl';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: 50,
    marginTop: 100,
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formControl: {
    minWidth: 160,
  },
}));

const Footer = () => {
  const classes = useStyles();
  const router = useRouter();

  const { formatMessage } = useIntl();

  const handleChangeLanguage = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    router.push(router.asPath, router.asPath, {
      locale: event.target.value as string,
    });
  };

  return (
    <footer className={classes.footer}>
      <Container className={classes.container}>
        <p>
          © 2020 ProjectHub, {formatMessage({ id: 'All rights reserved' })}.
        </p>

        <FormControl className={classes.formControl}>
          <InputLabel id='language'>Language</InputLabel>
          <Select
            labelId='language'
            id='language'
            value={router.locale}
            onChange={handleChangeLanguage}
            label='Language'
          >
            <MenuItem value='en'>English</MenuItem>
            <MenuItem value='zh'>Chinese</MenuItem>
          </Select>
        </FormControl>
      </Container>
    </footer>
  );
};

export default Footer;

import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { useIntl } from 'react-intl';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: 50,
      backgroundColor: theme.palette.grey[200],
      marginLeft: 0,
      width: 'auto',
      height: 45,
      display: 'flex',
      alignItems: 'center',
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
    },
  })
);

interface Props {
  onSubmit(value: string): void;
  className?: string;
}

const SearchBar: React.FC<Props> = ({ onSubmit, className = '' }) => {
  const [searchText, setSearchText] = useState('');
  const classes = useStyles();

  const { formatMessage } = useIntl();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(searchText);
  };

  return (
    <form className={`${classes.search} ${className}`} onSubmit={handleSubmit}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        onChange={(e) => setSearchText(e.target.value)}
        placeholder={formatMessage({ id: 'Search' }) + '...'}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        value={searchText}
      />
    </form>
  );
};

export default SearchBar;

import React, { useEffect, useState, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  getUserProgramsAction,
  uploadMetaResetAction,
} from 'store/actions/actions';
import { RootState } from 'store/reducers';

import { INITIAL_LIMIT_BY_PAGE } from 'consts';

import { Meta } from 'components/Meta/Meta';
import { Pagination } from 'components/Pagination/Pagination';

import styles from './Recent.module.scss';
import { UserProgram } from '../UserProgram/UserProgram';

import { SearchForm } from '../../../../blocks/SearchForm/SearchForm';

type ProgramMessageType = {
  programName: string;
  programId: string;
};

export const Recent: VFC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const urlSearch = location.search;
  const pageFromUrl = urlSearch ? Number(urlSearch.split('=')[1]) : 1;

  const [term, setTerm] = useState('');

  const { programsCount } = useSelector((state: RootState) => state.programs);
  let { programs } = useSelector((state: RootState) => state.programs);

  const singleProgram = useSelector((state: RootState) => state.programs.program);

  if (singleProgram) {
    programs = [singleProgram];
  }

  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [programMeta, setProgramMeta] = useState<ProgramMessageType | null>(null);

  const onPageChange = (page: number) => setCurrentPage(page);

  const offset = (currentPage - 1) * INITIAL_LIMIT_BY_PAGE;

  useEffect(() => {
    dispatch(
      getUserProgramsAction({
        publicKeyRaw: localStorage.getItem('public_key_raw'),
        limit: INITIAL_LIMIT_BY_PAGE,
        offset,
        term,
      })
    );
  }, [dispatch, offset, term]);

  const handleOpenForm = (programId: string, programName?: string) => {
    if (programName) {
      setProgramMeta({
        programId,
        programName,
      });
    }
  };

  const handleCloseMetaForm = () => {
    dispatch(uploadMetaResetAction());
    setProgramMeta(null);
  };

  if (programMeta) {
    return (
      <Meta programId={programMeta.programId} programName={programMeta.programName} handleClose={handleCloseMetaForm} />
    );
  }

  return (
    <div className={styles.blockList}>
      <div className={styles.paginationWrapper}>
        <span>Total results: {programsCount || 0}</span>
        <Pagination page={currentPage} count={programsCount || 1} onPageChange={onPageChange} />
      </div>
      <div>
        <SearchForm
          handleRemoveQuery={() => {
            setTerm('');
          }}
          handleSearch={(val: string) => {
            setTerm(val);
          }}
          placeholder="Find program"
        />
        <br />
      </div>
      {(programs && programs.length && (
        <div>
          {programs.map((program) => (
            <UserProgram program={program} handleOpenForm={handleOpenForm} key={program.id} />
          ))}
        </div>
      )) ||
        null}

      {programs && programs.length > 0 && (
        <div className={styles.paginationBottom}>
          <Pagination page={currentPage} count={programsCount || 1} onPageChange={onPageChange} />
        </div>
      )}
    </div>
  );
};

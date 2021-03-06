import { useState } from 'preact/hooks';
import {shuffleArray} from '../../../../utils/utils';
import {CHAR_DISPLAYS} from '../../../../utils/const';
import {NUM_DISPLAY_ROW} from '../../../../utils/const';

import style from './style';
import CharList from '../../../molecules/charlist';

import Grid from '../../../atoms/grid';
import Button from '../../../atoms/button';

const ResultsSelection = props => {
  const [isSuggesting, setSuggesting] = useState(true);
  const toggleCustom = () => {
    setSuggesting(!isSuggesting);
  }
  return (
    <>
      <Grid container m='4px 0 0' alignItems='center'>
        <Grid p='0 6px 0 0' flex={1/3}>
          <img style={{width: '100%'}}
            src={
              props.imageBlob ? URL.createObjectURL(props.imageBlob) : ''}
            border={'1'}
            alt={'canvas content'}
          />
        </Grid>
        <Grid flex={2/3}>
          <span>{'書いた文字は…'}</span>
        </Grid>
      </Grid>

      {isSuggesting ? (
        <>
          <SelectSuggestion
            predicted={props.predicted}
            onSelectChar={props.onSelectChar}
          />
          <Grid container justify='flex-end' m='4px 0 8px' key={0}>
            <Grid flex={1/4}></Grid>
            <Grid flex={3/4}>
              <Button outlined onClick={toggleCustom}>
                他の文字から選ぶ
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid container justify='flex-end' m='4px 0 12px' key={1}>
            <Grid flex={1/4}></Grid>
            <Grid flex={3/4}>
              <Button outlined onClick={toggleCustom}>
                提案された文字から選ぶ
              </Button>
            </Grid>
          </Grid>
          <CharList
            kanjiInfo={props.kanjiInfo}
            makeButton={(charCode, charType, c) => (
              <Button outlined
                onClick={(e) => props.onSelectChar(charCode)}
              >
                <span class={style.cellInner}>{c}</span>
              </Button>
            )}
          />
        </>
      )}
      <Grid m='12px 0 16px'>
        <Button outlined onClick={props.onClickBack}>戻る</Button>
      </Grid>
    </>
  );
};


const SelectSuggestion = props => {
  return (
    <>
      {props.predicted.map((obj, idx) => {
        const charType = obj[0];
        const chars = obj[1];
        return chars.length > 0 && (
          <Grid container key={idx}>
            <Grid flex={1/4}>
              <span>{CHAR_DISPLAYS[charType]}</span>
            </Grid>
            <Grid container flex={3/4}  flexWrap={'wrap'}>
            {shuffleArray(chars.slice(0, NUM_DISPLAY_ROW)).map(result => {
              const charCode = result[0];
              return (
                <Grid flex={1/6} m='2px' key={charCode}>
                  <Button outlined class={style.charcell}
                    onClick={(e) => props.onSelectChar(charCode)}
                  >
                    <span class={style.cellInner}>
                      {String.fromCharCode(parseInt(charCode, 16))}
                      {/* {' ' + result[1].toFixed(4)} {/* probablity */}
                    </span>
                  </Button>
                </Grid>
              )
            })}
            {chars.length < NUM_DISPLAY_ROW && (
                <Grid flex={(NUM_DISPLAY_ROW - chars.length)/6} m='2px' />
            )}
            </Grid>
          </Grid>
        )
      })}
    </>
  );
};


export default ResultsSelection;

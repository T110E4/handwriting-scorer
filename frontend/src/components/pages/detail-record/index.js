import Grid from '../../atoms/grid';
import Button from '../../atoms/button';
import CharList from '../../molecules/charlist';

const colorDef = [
  {min: 90, color: '#78ffa1'},
  {min: 50, color: '#fff702'},
  {min: 10, color: '#73e5ff'},
  {min:  0, color: '#cecece'},
];

const DetailRecord = (props) => {
  const achivements = props.achivements || {};
  const getButtonColor = (charType, c) => {
    let color = '#fff';
    if (achivements.byType &&
        achivements.byType[charType].byChar[c]) {
      const props = achivements.byType[charType].byChar[c];
      for (const def of colorDef) {
        if (props.max >= def.min) {
          color = def.color;
          break;
        }
      }
    }
    return color;
  };
  return (
    <>
      <h3>書いた文字一覧</h3>
      <Grid container justify='space-between' m={'0 0 16px'}>
        {colorDef.map((def, idx) => (
          <Grid flex={1/2} key={idx}>
            <div style={{
                backgroundColor: def.color,
                padding: '4px',
                textAlign: 'center',
            }}>
              <span>{`${def.min}点〜`}</span>
            </div>
          </Grid>
        ))}
      </Grid>
      <CharList
        makeButton={(charCode, charType, c) => {
          return (
            <div style={{
                minWidth: '48px',
                padding: '4px',
                textAlign: 'center',
                backgroundColor: getButtonColor(charType, c),
            }}>
              <span>{c}</span>
            </div>
          );
        }}
      />
    </>
  );
};

export default DetailRecord;

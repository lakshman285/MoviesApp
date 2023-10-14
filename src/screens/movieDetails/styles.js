import {StyleSheet} from 'react-native';
import {colors} from '../../typography/theme';
import {fonts} from '../../typography/fonts';

const styles = StyleSheet.create({
  movieItemView: {flexDirection: 'row', flex: 1},
  movieItemImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  movieItemDescriptionView: {flex: 1, marginLeft: 12},
  movieItemTitle: {fontSize: 16, paddingRight: 16, marginBottom: 12},
  movieItemDetailsText: {
    marginTop: 12,
    fontSize: 14,
    paddingRight: 16,
    fontFamily: fonts.families.primaryBold,
    fontWeight: 'bold',
    color: colors.black,
  },
  movieDetailsDescriptionText: {
    fontWeight: '500',
    color: colors.secondaryTextColor,
  },
  indicatorView: {justifyContent: 'center'},
  scrollViewContainer: {marginTop: 12, paddingBottom: 56},
  movieDetailsView: {backgroundColor: colors.white, padding: 16},
});
export default styles;

import {StyleSheet} from 'react-native';
import {fonts} from '../../typography/fonts';
import {colors} from '../../typography/theme';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.greyBackground},
  flatListView: {flex: 1, padding: 16},
  popularMoviesText: {
    fontSize: 18,
    fontFamily: fonts.families.secondaryBold,
    textAlign: 'center',
    padding: 12,
  },
  popularMoviesTextContainer: {
    borderBottomWidth: 0.5,
    backgroundColor: colors.white,
    borderBottomColor: colors.black,
  },
  movieItemContainer: {
    marginVertical: 8,
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  movieItemView: {flexDirection: 'row', flex: 1},
  movieItemImage: {width: 100, height: 120, borderRadius: 10},
  movieItemDescriptionView: {flex: 1, marginLeft: 12},
  movieItemTitle: {fontSize: 16, paddingRight: 16, marginBottom: 12},
  movieItemDetailsText: {
    fontSize: 14,
    paddingRight: 16,
    fontFamily: fonts.families.primaryBold,
    fontWeight: 'bold',
    color: colors.black,
  },
});
export default styles;

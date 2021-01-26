import { makeStyles as vanillaMakeStyles, MakeStylesDefinition, MakeStylesOptions } from '@fluentui/make-styles';
import { Tokens } from '@fluentui/theme';
import * as React from 'react';

import { useTheme } from './useTheme';
import { MakeStylesContext } from './MakeStylesContext';

export function makeStyles<Selectors>(definitions: MakeStylesDefinition<Selectors, Tokens>[]) {
  const getStyles = vanillaMakeStyles(definitions);

  return function useClasses(selectors: Selectors) {
    const { tokens, rtl } = useTheme();
    const renderer = React.useContext(MakeStylesContext);

    const options: MakeStylesOptions<Tokens> = {
      tokens: tokens as Tokens,
      renderer,
      rtl,
    };

    return getStyles(selectors, options);
  };
}

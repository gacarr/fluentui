import * as React from 'react';
import { createDOMRenderer, MakeStylesRenderer } from '@fluentui/make-styles';

export const MakeStylesContext = React.createContext<MakeStylesRenderer>(createDOMRenderer());

import type {} from '@mui/material/themeCssVarsAugmentation';
import { ThemeOptions } from '@mui/material/styles';
import { getDesignTokens } from './themePrimitives';
import {
  inputsCustomizations,
  dataDisplayCustomizations,
  feedbackCustomizations,
  navigationCustomizations,
  surfacesCustomizations,
} from './customizations';

export default function getMPTheme(): ThemeOptions {
  return {
    ...getDesignTokens('dark'),
    components: {
      ...inputsCustomizations,
      ...dataDisplayCustomizations,
      ...feedbackCustomizations,
      ...navigationCustomizations,
      ...surfacesCustomizations,
    },
  };
}
import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { YellowBox } from 'react-native'

import Routes from './routes'

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])

export default props => {
    return <Routes> </Routes>
}

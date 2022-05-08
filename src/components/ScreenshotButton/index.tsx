import { Camera, Trash } from 'phosphor-react-native';
import React from 'react';
import {
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';

interface Props {
    screeshot: string | null;
    onTakeShot: () => void;
    onRemoveShot: () => void;
}

export function ScreenshotButton({ screeshot, onTakeShot, onRemoveShot }: Props) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={screeshot ? onRemoveShot : onTakeShot}>
            {
                screeshot
                    ?
                    <View >
                        <Image
                            style={styles.image}
                            source={{uri: screeshot}}/>

                        <Trash
                            size={22}
                            color={theme.colors.text_secondary}
                            weight='fill'
                            style={styles.removeIcon}
                        />
                    </View>
                    :
                    <Camera
                        size={24}
                        color={theme.colors.text_primary}
                        weight='bold'
                    />
            }

        </TouchableOpacity>
    );
}
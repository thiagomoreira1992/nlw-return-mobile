import React, { useState } from 'react';
import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

import { ArrowLeft } from 'phosphor-react-native';
import { theme } from '../../theme';
import { captureScreen } from 'react-native-view-shot'

import * as FileSystem from 'expo-file-system';

import { FeedbackType } from '../Widget';

import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';
import { feedbackTypes } from '../../utils/feedbackTypes';

import { styles } from './styles';
import { Copyrights } from '../Copyrights';
import { api } from '../../Libs/api';

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: Props) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [comment, setComment] = useState('');

  const feedbackInfo = feedbackTypes[feedbackType];

  function handleScreenshot() {
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    })
      .then(uri => setScreenshot(uri))
      .catch(error => console.log(error));
  }

  function handleScreenshotRemove() {
    setScreenshot(null);
  }

  async function handleSentFeedback() {
    if (isSendingFeedback) {
      return;
    }

    setIsSendingFeedback(true);

    const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, {encoding: 'base64'});

    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: `data:image/png;base64,${screenshotBase64}`,
        comment
      })

      console.log(`data:image/png:base64,${screenshotBase64}`);

      onFeedbackSent()
    } catch (error) {
      console.log(error);
      setIsSendingFeedback(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onFeedbackCanceled}
        >
          <ArrowLeft
            size={24}
            weight="bold"            
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackInfo.image} style={styles.image} />
          <Text style={styles.titleText}>
            {feedbackInfo.title}
          </Text>
        </View>

      </View>

      <TextInput multiline
        style={styles.imput}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalher o que está acontecendo!"
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
          screenshot={screenshot}
        />

        <Button
          onPress={handleSentFeedback}
          isLoading={isSendingFeedback} />
      </View>
      <Copyrights />
    </View>
  );
}//:01:02
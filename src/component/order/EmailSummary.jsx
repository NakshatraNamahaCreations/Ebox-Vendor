import React, {useState} from 'react';
import {Button, View} from 'react-native';
import email from 'react-native-email';
import * as ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';

const EmailSummary = ({route}) => {
  const orderData = route.params.order;
  const vendorData = route.params.vendorData;
  console.log('vendorData in email summary>>>', vendorData);
  console.log('orderData in email summay>>>', orderData);

  const [attachments1, setAttachments1] = useState([]);
  const [attachments, setAttachments] = useState([]);

  const handleImagePicker = () => {
    const options = {
      title: 'Select Defective Item',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const {uri} = response.assets[0];
        try {
          const newUri = await moveFileToExternalStorage(uri);
          setAttachments([...attachments, {uri: newUri}]);
        } catch (error) {
          console.error('Error moving file:', error);
        }
      } else {
        console.log('Unexpected response structure:', response);
      }
    });
  };

  const moveFileToExternalStorage = async fileUri => {
    const fileName = fileUri.split('/').pop(); // Get the file name from the URI
    const newFilePath = `${RNFS.ExternalDirectoryPath}/${fileName}`; // New file path

    await RNFS.copyFile(fileUri, newFilePath); // Move the file
    return newFilePath;
  };

  const handleEmail = () => {
    const to = ['kiruthikamani0599@gmail.com'];
    email(to, {
      cc: ['sumanrajcivil01@gmail.com'],
      bcc: 'kiruthikamani0599@gmail.com',
      subject: 'Return Request - Defective Item',
      body: 'Please find the attached images of the defective item(s).',
      attachmentPaths: attachments.map(attachment => attachment.uri),
      attachmentNames: attachments.map((_, index) => `image${index + 1}.jpg`),
    }).catch(console.error);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Pick Images" onPress={handleImagePicker} />
      <Button title="Request Return" onPress={handleEmail} />
    </View>
  );
};

export default EmailSummary;

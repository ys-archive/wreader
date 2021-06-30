import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const PolicyAndCondition = () => {
  return (
    <ScrollView>
      <View style={s.root}>
        <Text style={{ fontSize: 32, marginBottom: 10 }}>
          Terms and Conditions
        </Text>
        <Text></Text>

        <Text>
          &nbsp;&nbsp;General Site Usage Last Revised: December 16, 2013 Welcome
          to www.lorem-ipsum.info.
        </Text>
        <Text></Text>

        <Text>
          &nbsp;&nbsp;This site is provided as a service to our visitors and may
          be used for informational purposes only. Because the Terms and
          Conditions contain legal obligations, please read them carefully. 1.
          YOUR AGREEMENT By using this Site, you agree to be bound by, and to
          comply with, these Terms and Conditions. If you do not agree to these
          Terms and Conditions, please do not use this site.
        </Text>
        <Text></Text>

        <Text>
          &nbsp;&nbsp;PLEASE NOTE: We reserve the right, at our sole discretion,
          to change, modify or otherwise alter these Terms and Conditions at any
          time. Unless otherwise indicated, amendments will become effective
          immediately. Please review these Terms and Conditions periodically.
          Your continued use of the Site following the posting of changes and/or
          modifications will constitute your acceptance of the revised Terms and
          Conditions and the reasonableness of these standards for notice of
          changes.
        </Text>
        <Text></Text>

        <Text>
          &nbsp;&nbsp;For your information, this page was last updated as of the
          date at the top of these terms and conditions. 2. PRIVACY Please
          review our Privacy Policy, which also governs your visit to this Site,
          to understand our practices. 3. LINKED SITES This Site may contain
          links to other independent third-party Web sites ("Linked Sites”).
          These Linked Sites are provided solely as a convenience to our
          visitors. Such Linked Sites are not under our control, and we are not
          responsible for and does not endorse the content of such Linked Sites,
          including any information or materials contained on such Linked Sites.
          You will need to make your own independent judgment regarding your
          interaction with these Linked Sites. 4. FORWARD LOOKING STATEMENTS All
          materials reproduced on this site speak as of the original date of
          publication or filing. The fact that a document is available on this
          site does not mean that the information contained in such document has
          not been modified or superseded by events or by a subsequent document
          or filing. We have no duty or policy to update any information or
          statements contained on this site and, therefore, such information or
          statements should not be relied upon as being current as of the date
          you access this site.
        </Text>
      </View>
    </ScrollView>
  );
};

export default PolicyAndCondition;

const s = StyleSheet.create({
  root: {
    padding: 30,
    marginVertical: '15%',
  },
});

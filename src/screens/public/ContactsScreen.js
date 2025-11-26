import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/common/Header';
import { COLORS } from '../../constants/colors';

const ContactCard = ({ name, phone, address, type }) => (
  <View style={styles.contactCard}>
    <Text style={styles.contactName}>{name}</Text>
    {type && <Text style={styles.contactType}>{type}</Text>}
    <View style={styles.contactDetails}>
      <View style={styles.detailRow}>
        <Ionicons name="call-outline" size={16} color={COLORS.primary} />
        <TouchableOpacity onPress={() => Linking.openURL(`tel:${phone}`)}>
          <Text style={styles.detailText}>{phone}</Text>
        </TouchableOpacity>
      </View>
      {address && (
        <View style={styles.detailRow}>
          <Ionicons name="location-outline" size={16} color={COLORS.primary} />
          <Text style={[styles.detailText, styles.addressText]}>{address}</Text>
        </View>
      )}
    </View>
  </View>
);

export default function ContactsScreen() {
  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Rede de Apoio</Text>
        <Text style={styles.subtitle}>
          Instituições e profissionais disponíveis para ajudar
        </Text>

        <ContactCard
          name="Centro de Atenção Psicossocial (CAPS)"
          phone="(81) 3123-4567"
          address="Rua das Flores, 123 - Boa Vista, Recife/PE"
        />

        <ContactCard
          name="Clínica de Psicologia - UNINASSAU"
          phone="(81) 3234-5678"
          address="Av. Principal, 456 - Graças, Recife/PE"
        />

        <View style={styles.emergencyCard}>
          <Text style={styles.emergencyTitle}>CVV - Centro de Valorização da Vida</Text>
          <Text style={styles.emergencyDescription}>
            Apoio emocional e prevenção do suicídio. Atendimento 24h por telefone, email e chat.
          </Text>
          <View style={styles.emergencyPhone}>
            <Ionicons name="call" size={24} color={COLORS.info} />
            <Text style={styles.emergencyPhoneText}>188</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.gray600,
    marginBottom: 24,
  },
  contactCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    boxShadowColor: '#000',
    boxShadowOffset: { width: 0, height: 2 },
    boxShadowOpacity: 0.1,
    boxShadowRadius: 4,
    elevation: 3,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: 8,
  },
  contactType: {
    fontSize: 13,
    color: COLORS.gray600,
    marginBottom: 12,
  },
  contactDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: COLORS.gray700,
    flex: 1,
  },
  addressText: {
    lineHeight: 20,
  },
  emergencyCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#BFDBFE',
    padding: 20,
    marginTop: 8,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: 8,
  },
  emergencyDescription: {
    fontSize: 14,
    color: COLORS.gray700,
    marginBottom: 16,
    lineHeight: 20,
  },
  emergencyPhone: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emergencyPhoneText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.info,
  },
});

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/common/Header';
import { COLORS } from '../../constants/colors';

const TipCard = ({ title, source }) => (
  <View style={styles.tipCard}>
    <Text style={styles.tipTitle}>{title}</Text>
    <View style={styles.tipFooter}>
      <Text style={styles.tipSource}>{source}</Text>
      <TouchableOpacity style={styles.tipButton}>
        <Text style={styles.tipButtonText}>CONFIRA AQUI</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function FamilyScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>DICAS PRÁTICAS</Text>

        <TipCard
          title="9 dicas de combate à dependência virtual | Internet"
          source="TECMUNDO"
        />

        <TipCard
          title="Detox digital: 8 dicas para reduzir o uso excessivo de telas"
          source="CNN | BRASIL"
        />

        <Text style={[styles.sectionTitle, styles.sectionTitleSpaced]}>MURAL DE APOIO</Text>

        <View style={styles.muralCard}>
          <View style={styles.muralIcon}>
            <Ionicons name="chatbubbles-outline" size={48} color={COLORS.primary} />
          </View>
          <Text style={styles.muralText}>
            No momento, ainda não há reuniões de apoio psicológico disponíveis.
            Assim que forem agendadas, a programação será divulgada aqui.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.contactsButton}
          onPress={() => navigation.navigate('Contacts')}
        >
          <Ionicons name="call-outline" size={20} color={COLORS.white} />
          <Text style={styles.contactsButtonText}>VER CONTATOS DE APOIO</Text>
        </TouchableOpacity>
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 16,
  },
  sectionTitleSpaced: {
    marginTop: 32,
  },
  tipCard: {
    backgroundColor: COLORS.cardBgOpacity,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.cardBorderOpacity,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 12,
    lineHeight: 22,
  },
  tipFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tipSource: {
    fontSize: 12,
    color: COLORS.gray600,
  },
  tipButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  tipButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  muralCard: {
    backgroundColor: COLORS.cardBgOpacity,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.cardBorderOpacity,
  },
  muralIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  muralText: {
    fontSize: 14,
    color: COLORS.gray700,
    textAlign: 'center',
    lineHeight: 22,
  },
  contactsButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactsButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

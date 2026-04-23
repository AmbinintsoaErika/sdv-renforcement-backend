import fetchData from "@/hooks/fetchData";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Card, Switch, Text } from "react-native-paper";

type SinistreType = {
    id: number | string,
    statut?: string,
    dateAppel: any,
    dateSinistre: any,
    contexte: string,
    attestationAssurance: any,
    carteGrise: any,
    cin: any
}

export default function SinistreDetailScreen() {
    const [ sinistre, setSinistre ] = useState<SinistreType>()
    const { id } = useLocalSearchParams<{ id: string }>();

    useEffect(() => {
        fetchData('/sinistres/'+id, 'GET', {}, true)
            .then(data => {
                setSinistre(data)
            })
            .catch(err => {
                console.log('Error on get sinistre ' + err.message)
            })
    }, [id])

    if(!sinistre) {
        return (
            <View>
                <Text>Le sinistre est introuvable !</Text>
            </View>
        )
    }

    return (
        <ScrollView>
            <Card
                key={sinistre.id}
            >
                <Card.Title title="Mon sinistre" />
                <Card.Content>
                    <Text>Statut : {sinistre.statut}</Text>
                    <Text>Date du sinistre : {sinistre.dateSinistre}</Text>
                    <Text>Date de signalement du sinistre : {sinistre.dateAppel}</Text>
                    <Text>Contexte du sinistre : {sinistre.contexte}</Text>
                </Card.Content>
            </Card>
        </ScrollView>
    )
}
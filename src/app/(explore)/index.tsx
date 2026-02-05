import { useState, useMemo, useEffect } from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import { useNavigation } from "expo-router";
import * as AC from "@bacons/apple-colors";
import BarCard from "@/components/bar-card";
import { sfBars, neighborhoods } from "@/data/bars";
import { useRoute } from "@/context/route-context";

export default function ExploreScreen() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("All");
  const [search, setSearch] = useState("");
  const { addToRoute, removeFromRoute, isInRoute } = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: "Search bars...",
        onChangeText: (e: { nativeEvent: { text: string } }) => setSearch(e.nativeEvent.text),
        onCancelButtonPress: () => setSearch(""),
      },
    });
  }, [navigation]);

  const filteredBars = useMemo(() => {
    let bars = sfBars;
    if (selectedNeighborhood !== "All") {
      bars = bars.filter((b) => b.neighborhood === selectedNeighborhood);
    }
    if (search) {
      const lowerSearch = search.toLowerCase();
      bars = bars.filter(
        (b) =>
          b.name.toLowerCase().includes(lowerSearch) ||
          b.neighborhood.toLowerCase().includes(lowerSearch) ||
          b.vibe.toLowerCase().includes(lowerSearch)
      );
    }
    return bars;
  }, [selectedNeighborhood, search]);

  const handleToggleRoute = (bar: (typeof sfBars)[0]) => {
    if (isInRoute(bar.id)) {
      removeFromRoute(bar.id);
    } else {
      addToRoute(bar);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: AC.systemGroupedBackground as unknown as string }}
      contentInsetAdjustmentBehavior="automatic"
      keyboardDismissMode="on-drag"
    >
      <View style={{ padding: 16, gap: 16 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          {neighborhoods.map((hood) => (
            <Pressable
              key={hood}
              onPress={() => setSelectedNeighborhood(hood)}
              style={({ pressed }) => ({
                backgroundColor:
                  selectedNeighborhood === hood
                    ? (AC.systemBlue as unknown as string)
                    : (AC.tertiarySystemFill as unknown as string),
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 16,
                borderCurve: "continuous",
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color:
                    selectedNeighborhood === hood
                      ? "white"
                      : (AC.label as unknown as string),
                }}
              >
                {hood}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={{ gap: 16 }}>
          {filteredBars.map((bar) => (
            <BarCard
              key={bar.id}
              bar={bar}
              onAdd={() => handleToggleRoute(bar)}
              isInRoute={isInRoute(bar.id)}
            />
          ))}

          {filteredBars.length === 0 && (
            <View
              style={{
                padding: 40,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: AC.secondaryLabel as unknown as string,
                  textAlign: "center",
                }}
              >
                No bars found matching your criteria
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

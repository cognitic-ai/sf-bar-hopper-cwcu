import { ScrollView, View, Text, Pressable, Linking } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, Stack } from "expo-router";
import * as AC from "@bacons/apple-colors";
import { sfBars } from "@/data/bars";
import { useRoute } from "@/context/route-context";

export default function BarDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addToRoute, removeFromRoute, isInRoute } = useRoute();

  const bar = sfBars.find((b) => b.id === id);

  if (!bar) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: AC.systemBackground as unknown as string,
        }}
      >
        <Text style={{ fontSize: 18, color: AC.label as unknown as string }}>Bar not found</Text>
      </View>
    );
  }

  const inRoute = isInRoute(bar.id);
  const priceSymbol = "$".repeat(bar.priceLevel);

  const handleToggleRoute = () => {
    if (inRoute) {
      removeFromRoute(bar.id);
    } else {
      addToRoute(bar);
    }
  };

  const handleOpenMaps = () => {
    const url = `https://maps.apple.com/?q=${encodeURIComponent(bar.name)}&address=${encodeURIComponent(bar.address + ", San Francisco, CA")}`;
    Linking.openURL(url);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: bar.name,
          headerLargeTitle: false,
        }}
      />
      <ScrollView
        style={{ flex: 1, backgroundColor: AC.systemGroupedBackground as unknown as string }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Image
          source={{ uri: bar.image }}
          style={{ width: "100%", height: 280 }}
          contentFit="cover"
          transition={300}
        />

        <View style={{ padding: 20, gap: 20 }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: "700",
                    color: AC.label as unknown as string,
                  }}
                >
                  {bar.name}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: AC.secondaryLabel as unknown as string,
                    marginTop: 4,
                  }}
                >
                  {bar.neighborhood}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  backgroundColor: AC.systemYellow as unknown as string,
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 12,
                  borderCurve: "continuous",
                }}
              >
                <Image source="sf:star.fill" style={{ width: 14, height: 14, tintColor: "white" }} />
                <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}>{bar.rating}</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 12,
            }}
          >
            <Pressable
              onPress={handleToggleRoute}
              style={({ pressed }) => ({
                flex: 1,
                backgroundColor: inRoute
                  ? (AC.systemGreen as unknown as string)
                  : (AC.systemBlue as unknown as string),
                paddingVertical: 14,
                borderRadius: 14,
                borderCurve: "continuous",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                gap: 8,
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Image
                source={inRoute ? "sf:checkmark.circle.fill" : "sf:plus.circle.fill"}
                style={{ width: 20, height: 20, tintColor: "white" }}
              />
              <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
                {inRoute ? "In Route" : "Add to Route"}
              </Text>
            </Pressable>

            <Pressable
              onPress={handleOpenMaps}
              style={({ pressed }) => ({
                backgroundColor: AC.tertiarySystemFill as unknown as string,
                paddingVertical: 14,
                paddingHorizontal: 16,
                borderRadius: 14,
                borderCurve: "continuous",
                alignItems: "center",
                justifyContent: "center",
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Image
                source="sf:map.fill"
                style={{ width: 22, height: 22, tintColor: AC.systemBlue as unknown as string }}
              />
            </Pressable>
          </View>

          <View
            style={{
              backgroundColor: AC.secondarySystemGroupedBackground as unknown as string,
              borderRadius: 16,
              borderCurve: "continuous",
              padding: 16,
              gap: 16,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: AC.label as unknown as string,
                lineHeight: 24,
              }}
              selectable
            >
              {bar.description}
            </Text>

            <View
              style={{
                height: 1,
                backgroundColor: AC.separator as unknown as string,
              }}
            />

            <View style={{ gap: 12 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <Image
                  source="sf:mappin.circle.fill"
                  style={{ width: 24, height: 24, tintColor: AC.systemRed as unknown as string }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: AC.label as unknown as string,
                    flex: 1,
                  }}
                  selectable
                >
                  {bar.address}, San Francisco
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <Image
                  source="sf:clock.fill"
                  style={{ width: 24, height: 24, tintColor: AC.systemOrange as unknown as string }}
                />
                <Text style={{ fontSize: 15, color: AC.label as unknown as string }}>{bar.hours}</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <Image
                  source="sf:dollarsign.circle.fill"
                  style={{ width: 24, height: 24, tintColor: AC.systemGreen as unknown as string }}
                />
                <Text style={{ fontSize: 15, color: AC.label as unknown as string }}>
                  {priceSymbol} · {bar.vibe}
                </Text>
              </View>
            </View>
          </View>

          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: AC.label as unknown as string,
                marginBottom: 12,
              }}
            >
              Known For
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {bar.specialties.map((specialty, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: AC.tertiarySystemFill as unknown as string,
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    borderRadius: 16,
                    borderCurve: "continuous",
                  }}
                >
                  <Text style={{ fontSize: 14, color: AC.label as unknown as string }}>{specialty}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

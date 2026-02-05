import { ScrollView, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import * as AC from "@bacons/apple-colors";
import { useRoute } from "@/context/route-context";

export default function RouteScreen() {
  const { route, removeFromRoute, clearRoute, reorderRoute } = useRoute();

  if (route.length === 0) {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: AC.systemGroupedBackground as unknown as string }}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 40,
        }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Image
          source="sf:map.fill"
          style={{
            width: 80,
            height: 80,
            tintColor: AC.tertiaryLabel as unknown as string,
            marginBottom: 16,
          }}
        />
        <Text
          style={{
            fontSize: 22,
            fontWeight: "600",
            color: AC.label as unknown as string,
            marginBottom: 8,
          }}
        >
          No Bars Yet
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: AC.secondaryLabel as unknown as string,
            textAlign: "center",
            lineHeight: 22,
          }}
        >
          Start adding bars from the Explore tab to build your bar hopping route
        </Text>
      </ScrollView>
    );
  }

  const estimatedTime = route.length * 45;
  const hours = Math.floor(estimatedTime / 60);
  const minutes = estimatedTime % 60;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: AC.systemGroupedBackground as unknown as string }}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={{ padding: 16, gap: 16 }}>
        <View
          style={{
            backgroundColor: AC.secondarySystemGroupedBackground as unknown as string,
            borderRadius: 16,
            borderCurve: "continuous",
            padding: 16,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontSize: 14, color: AC.secondaryLabel as unknown as string }}>
              Tonight's Adventure
            </Text>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "700",
                color: AC.label as unknown as string,
                fontVariant: ["tabular-nums"],
              }}
            >
              {route.length} {route.length === 1 ? "Bar" : "Bars"}
            </Text>
            <Text style={{ fontSize: 14, color: AC.tertiaryLabel as unknown as string, marginTop: 4 }}>
              ~{hours > 0 ? `${hours}h ` : ""}
              {minutes > 0 ? `${minutes}m` : ""}
            </Text>
          </View>
          <Pressable
            onPress={clearRoute}
            style={({ pressed }) => ({
              backgroundColor: AC.systemRed as unknown as string,
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 20,
              borderCurve: "continuous",
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}>Clear All</Text>
          </Pressable>
        </View>

        <View style={{ gap: 0 }}>
          {route.map((bar, index) => (
            <View key={bar.id}>
              {index > 0 && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 24,
                    height: 40,
                  }}
                >
                  <View
                    style={{
                      width: 2,
                      height: "100%",
                      backgroundColor: AC.separator as unknown as string,
                    }}
                  />
                  <Image
                    source="sf:figure.walk"
                    style={{
                      width: 16,
                      height: 16,
                      tintColor: AC.tertiaryLabel as unknown as string,
                      marginLeft: 12,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      color: AC.tertiaryLabel as unknown as string,
                      marginLeft: 6,
                    }}
                  >
                    ~10 min walk
                  </Text>
                </View>
              )}

              <Link href={`/bar/${bar.id}`} asChild>
                <Pressable
                  style={({ pressed }) => ({
                    backgroundColor: AC.secondarySystemGroupedBackground as unknown as string,
                    borderRadius: 16,
                    borderCurve: "continuous",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 12,
                    gap: 12,
                    opacity: pressed ? 0.9 : 1,
                  })}
                >
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      backgroundColor: AC.systemBlue as unknown as string,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "700",
                        color: "white",
                        fontVariant: ["tabular-nums"],
                      }}
                    >
                      {index + 1}
                    </Text>
                  </View>

                  <Image
                    source={{ uri: bar.image }}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 12,
                      borderCurve: "continuous",
                    }}
                    contentFit="cover"
                  />

                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "600",
                        color: AC.label as unknown as string,
                      }}
                      numberOfLines={1}
                    >
                      {bar.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: AC.secondaryLabel as unknown as string,
                        marginTop: 2,
                      }}
                    >
                      {bar.neighborhood} · {bar.vibe}
                    </Text>
                  </View>

                  <Pressable
                    onPress={(e) => {
                      e.stopPropagation();
                      removeFromRoute(bar.id);
                    }}
                    hitSlop={8}
                    style={({ pressed }) => ({
                      opacity: pressed ? 0.6 : 1,
                      padding: 8,
                    })}
                  >
                    <Image
                      source="sf:xmark.circle.fill"
                      style={{
                        width: 24,
                        height: 24,
                        tintColor: AC.tertiaryLabel as unknown as string,
                      }}
                    />
                  </Pressable>
                </Pressable>
              </Link>
            </View>
          ))}
        </View>

        <View
          style={{
            backgroundColor: AC.secondarySystemGroupedBackground as unknown as string,
            borderRadius: 16,
            borderCurve: "continuous",
            padding: 16,
            marginTop: 8,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: AC.secondaryLabel as unknown as string,
              textAlign: "center",
              lineHeight: 20,
            }}
          >
            💡 Tip: Start with lighter drinks and pace yourself. Stay hydrated and have a safe ride home!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

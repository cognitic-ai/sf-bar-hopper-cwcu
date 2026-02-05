import { View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import * as AC from "@bacons/apple-colors";
import { sfBars } from "@/data/bars";
import { useRoute } from "@/context/route-context";

export default function MapScreen() {
  const { isInRoute, addToRoute, removeFromRoute } = useRoute();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: AC.systemGroupedBackground as unknown as string }}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={{ padding: 20, gap: 16 }}>
        <View
          style={{
            backgroundColor: AC.secondarySystemGroupedBackground as unknown as string,
            borderRadius: 16,
            borderCurve: "continuous",
            padding: 20,
            alignItems: "center",
            gap: 12,
          }}
        >
          <Image
            source="sf:map.fill"
            style={{
              width: 48,
              height: 48,
              tintColor: AC.systemBlue as unknown as string,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: AC.label as unknown as string,
              textAlign: "center",
            }}
          >
            SF Bar Map
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: AC.secondaryLabel as unknown as string,
              textAlign: "center",
              lineHeight: 20,
            }}
          >
            Browse bars across San Francisco neighborhoods
          </Text>
        </View>

        <View style={{ gap: 12 }}>
          {sfBars.map((bar) => {
            const inRoute = isInRoute(bar.id);
            return (
              <Link key={bar.id} href={`/bar/${bar.id}`} asChild>
                <Pressable
                  style={({ pressed }) => ({
                    backgroundColor: AC.secondarySystemGroupedBackground as unknown as string,
                    borderRadius: 14,
                    borderCurve: "continuous",
                    padding: 14,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 14,
                    opacity: pressed ? 0.9 : 1,
                  })}
                >
                  <Image
                    source={{ uri: bar.image }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 10,
                      borderCurve: "continuous",
                    }}
                    contentFit="cover"
                  />
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: AC.label as unknown as string,
                      }}
                      numberOfLines={1}
                    >
                      {bar.name}
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 2 }}>
                      <Image
                        source="sf:mappin"
                        style={{
                          width: 12,
                          height: 12,
                          tintColor: AC.tertiaryLabel as unknown as string,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 13,
                          color: AC.secondaryLabel as unknown as string,
                        }}
                      >
                        {bar.neighborhood}
                      </Text>
                    </View>
                  </View>
                  <Pressable
                    onPress={(e) => {
                      e.stopPropagation();
                      if (inRoute) {
                        removeFromRoute(bar.id);
                      } else {
                        addToRoute(bar);
                      }
                    }}
                    hitSlop={8}
                    style={({ pressed }) => ({
                      backgroundColor: inRoute
                        ? (AC.systemGreen as unknown as string)
                        : (AC.systemBlue as unknown as string),
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      justifyContent: "center",
                      alignItems: "center",
                      opacity: pressed ? 0.8 : 1,
                    })}
                  >
                    <Image
                      source={inRoute ? "sf:checkmark" : "sf:plus"}
                      style={{ width: 14, height: 14, tintColor: "white", fontWeight: "600" }}
                    />
                  </Pressable>
                </Pressable>
              </Link>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

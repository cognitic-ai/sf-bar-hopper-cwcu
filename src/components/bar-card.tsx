import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import * as AC from "@bacons/apple-colors";
import type { Bar } from "@/data/bars";

interface BarCardProps {
  bar: Bar;
  onAdd?: () => void;
  isInRoute?: boolean;
}

export default function BarCard({ bar, onAdd, isInRoute }: BarCardProps) {
  const priceSymbol = "$".repeat(bar.priceLevel);

  return (
    <Link href={`/bar/${bar.id}`} asChild>
      <Pressable
        style={({ pressed }) => ({
          backgroundColor: AC.secondarySystemGroupedBackground as unknown as string,
          borderRadius: 16,
          borderCurve: "continuous",
          overflow: "hidden",
          opacity: pressed ? 0.9 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        })}
      >
        <Image
          source={{ uri: bar.image }}
          style={{ width: "100%", height: 160 }}
          contentFit="cover"
          transition={200}
        />
        <View style={{ padding: 14, gap: 8 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 18,
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
                {bar.neighborhood}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Image
                source="sf:star.fill"
                style={{ width: 14, height: 14, tintColor: AC.systemYellow as unknown as string }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: AC.label as unknown as string,
                }}
              >
                {bar.rating}
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: 14,
              color: AC.secondaryLabel as unknown as string,
              lineHeight: 20,
            }}
            numberOfLines={2}
          >
            {bar.description}
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <View
                style={{
                  backgroundColor: AC.tertiarySystemFill as unknown as string,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 6,
                  borderCurve: "continuous",
                }}
              >
                <Text style={{ fontSize: 13, color: AC.label as unknown as string }}>{bar.vibe}</Text>
              </View>
              <Text style={{ fontSize: 14, color: AC.tertiaryLabel as unknown as string }}>{priceSymbol}</Text>
            </View>

            {onAdd && (
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  onAdd();
                }}
                style={({ pressed }) => ({
                  backgroundColor: isInRoute
                    ? (AC.systemGreen as unknown as string)
                    : (AC.systemBlue as unknown as string),
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 14,
                  borderCurve: "continuous",
                  opacity: pressed ? 0.8 : 1,
                })}
              >
                <Text style={{ fontSize: 13, fontWeight: "600", color: "white" }}>
                  {isInRoute ? "Added" : "Add"}
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

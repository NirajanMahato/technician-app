import React, { ReactNode } from "react";
import {
  TextInput,
  TextInputProps,
  TextProps,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

// -------------------- UI Props --------------------

export type ScreenWrapperProps = {
  style?: ViewStyle;
  children: React.ReactNode;
};

export type ModalWrapperProps = {
  style?: ViewStyle;
  children: React.ReactNode;
  bg?: string;
};

export type TypoProps = {
  size?: number;
  color?: string;
  fontWeight?: TextStyle["fontWeight"];
  children: any | null;
  style?: TextStyle;
  textProps?: TextProps;
};

export type IconComponent = React.ComponentType<{
  height?: number;
  width?: number;
  strokeWidth?: number;
  color?: string;
  fill?: string;
}>;

export type IconProps = {
  name: string;
  color?: string;
  size?: number;
  strokeWidth?: number;
  fill?: string;
};

export type HeaderProps = {
  title?: string;
  style?: ViewStyle;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export type BackButtonProps = {
  style?: ViewStyle;
  iconSize?: number;
};

export interface InputProps extends TextInputProps {
  icon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  inputRef?: React.RefObject<TextInput>;
}

export interface CustomButtonProps extends TouchableOpacityProps {
  style?: ViewStyle;
  onPress?: () => void;
  loading?: boolean;
  children: React.ReactNode;
}

export type ImageUploadProps = {
  file?: any;
  onSelect: (file: any) => void;
  onClear: () => void;
  containerStyle?: ViewStyle;
  imageStyle?: ViewStyle;
  placeholder?: string;
};

export type accountOptionType = {
  title: string;
  icon: React.ReactNode;
  bgColor: string;
  routeName?: any;
};

// -------------------- Backend Types --------------------

// Auth token + minimal info
export type AuthUser = {
  id: string;
  role: "customer" | "technician" | "admin";
  token: string;
  fullName: string;
  email: string;
  profilePicture?: string;
};

// Full user profile for display or context
export type UserProfile = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  role: "customer" | "technician" | "admin";
  address?: string;
  profilePicture?: string;
  location?: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat]
  };
  skills?: string[];
  experience?: number;
  verified?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

// Auth context for React
export type AuthContextType = {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  login: (user: AuthUser) => Promise<void>;
  logout: () => Promise<void>;
};

// Service model type (from backend)
export type ServiceType = {
  _id: string;
  customer: string | UserProfile;
  technician: string | UserProfile;
  serviceType: string;
  description?: string;
  status: "pending" | "accepted" | "in_progress" | "completed" | "cancelled";
  scheduledDate?: Date;
  completedDate?: Date;
  price: number;
  customerRating?: number;
  customerReview?: string;
  createdAt?: string;
  updatedAt?: string;
};

// Response wrapper
export type ResponseType = {
  success: boolean;
  data?: any;
  msg?: string;
};

export type DrawerParamList = {
  chat: { id: string };
  // Add other drawer routes here as needed
}; 
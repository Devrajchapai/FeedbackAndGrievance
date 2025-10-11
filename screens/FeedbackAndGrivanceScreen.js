import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, FlatList, ScrollView, Alert, Image } from 'react-native';
import { Avatar, Card, Text, Button, Modal, Portal, TextInput, Divider, IconButton, Provider, Chip } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- Static Data Definitions ---
const DEPARTMENTS = ['Administration', 'Engineering', 'Education', 'Health', 'Finance', 'Local Governance'];
const GRIEVANCE_STATUSES = ['Open', 'In Progress', 'Resolved', 'Closed'];

// --- Shared Utility Components ---
const StarRating = ({ rating }) => (
    <View style={styles.ratingRow}>
        {[1, 2, 3, 4, 5].map((star) => (
            <IconButton
                key={star}
                icon={star <= rating ? 'star' : 'star-outline'}
                iconColor={star <= rating ? '#FFC107' : '#CCC'}
                size={20}
                style={{ margin: 0, padding: 0 }}
                onPress={() => {}}
            />
        ))}
    </View>
);

// --- Main Component ---
const FeedbackAndGrivanceScreen = ({ navigation }) => {
    const route = useRoute();
    const { districtName, municipalities: initialMunicipalities = [], state = '' } = route.params || {};

    const [activeTab, setActiveTab] = useState('Feedback');
    const [feedbackList, setFeedbackList] = useState([]);
    const [grievanceList, setGrievanceList] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const [municipalities, setMunicipalities] = useState(initialMunicipalities);
    
    // Feedback Modal State
    const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
    const [selectedMunicipality, setSelectedMunicipality] = useState('');
    const [feedbackComment, setFeedbackComment] = useState('');
    const [feedbackRating, setFeedbackRating] = useState(0);
    const [feedbackDepartment, setFeedbackDepartment] = useState(DEPARTMENTS[0]);
    const [feedbackImageUri, setFeedbackImageUri] = useState(null);

    // Grievance Modal State
    const [isGrievanceVisible, setIsGrievanceVisible] = useState(false);
    const [grievanceTitle, setGrievanceTitle] = useState('');
    const [grievanceDescription, setGrievanceDescription] = useState('');
    const [grievanceDepartment, setGrievanceDepartment] = useState(DEPARTMENTS[0]);
    const [grievanceImageUri, setGrievanceImageUri] = useState(null);

    // Selector Modal State
    const [isMunicipalitySelectorVisible, setIsMunicipalitySelectorVisible] = useState(false);
    const [isFeedbackDepartmentSelectorVisible, setIsFeedbackDepartmentSelectorVisible] = useState(false);
    const [isGrievanceDepartmentSelectorVisible, setIsGrievanceDepartmentSelectorVisible] = useState(false);


    const refreshToken = async () => {
        try {
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            if (!refreshToken) throw new Error('No refresh token found');

            const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }

            const data = await response.json();
            await AsyncStorage.setItem('accessToken', data.access);
            return data.access;
        } catch (error) {
            console.error('Token refresh failed:', error.message);
            Alert.alert('Session Expired', 'Please log in again.', [
                { text: 'OK', onPress: () => navigation.navigate('LoginScreen') }, // Adjust to your login route
            ]);
            throw error;
        }
    };

    // Fetch municipalities, user profile, feedback, and grievances
    useEffect(() => {
    const fetchData = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            if (!token) throw new Error('No access token found');

            // // Step 1: Fetch states to get ID for the passed state name (e.g., 'Bagmati')
            // console.log('Fetching states...');
            // const statesResponse = await fetch('http://127.0.0.1:8000/api/states/', {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${token}`,
            //     },
            // });
            // if (!statesResponse.ok) {
            //     const errorData = await statesResponse.json();
            //     throw new Error(`Failed to fetch states: ${JSON.stringify(errorData)}`);
            // }
            // const statesData = await statesResponse.json();
            // console.log('States fetched:', statesData);

            // const stateObj = statesData.find(s => s.name.toLowerCase() === state.toLowerCase()); // Case-insensitive match
            // if (!stateObj) throw new Error(`State "${state}" not found in backend`);

            // const stateId = stateObj.id;

            // Step 2: Fetch municipalities filtered by state ID
            console.log(`Fetching municipalities for state ID ${stateId}...`);
            const municipalitiesResponse = await fetch(`http://127.0.0.1:8000/api/municipalities/?state=${stateId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!municipalitiesResponse.ok) {
                const errorData = await municipalitiesResponse.json();
                throw new Error(`Failed to fetch municipalities: ${JSON.stringify(errorData)}`);
            }
            const municipalitiesData = await municipalitiesResponse.json();
            console.log('Municipalities fetched:', municipalitiesData);
            setMunicipalities(municipalitiesData);

            if (municipalitiesData.length > 0 && !selectedMunicipality) {
                setSelectedMunicipality(municipalitiesData[0].name);
            }

                // Fetch user profile
                console.log('Fetching user profile...');
                const profileResponse = await fetch('http://127.0.0.1:8000/api/user/profile/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!profileResponse.ok) {
                    const errorData = await profileResponse.json();
                    throw new Error(`Failed to fetch user profile: ${JSON.stringify(errorData)}`);
                }
                const profile = await profileResponse.json();
                console.log('User profile fetched:', profile);
                setUserProfile(profile);

                // Fetch feedback
                console.log('Fetching feedback...');
                const feedbackResponse = await fetch('http://127.0.0.1:8000/api/feedback/list/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!feedbackResponse.ok) {
                    const errorData = await feedbackResponse.json();
                    throw new Error(`Failed to fetch feedback: ${JSON.stringify(errorData)}`);
                }
                const feedbackData = await feedbackResponse.json();
                console.log('Feedback fetched:', feedbackData);
                setFeedbackList(feedbackData.map(f => ({
                    id: f.id.toString(),
                    municipality: municipalitiesData.find(m => m.id === f.municipality)?.name || f.municipality_name || '',
                    rating: f.rating,
                    comment: f.comment,
                    date: f.created_at ? f.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
                    department: f.department,
                    imageUri: f.image_url || null,
                    state: f.state || state || municipalitiesData.find(m => m.id === f.municipality)?.state || '',
                })));

                // Fetch grievances
                console.log('Fetching grievances...');
                const grievancesResponse = await fetch('http://127.0.0.1:8000/api/grievance/list/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!grievancesResponse.ok) {
                    const errorData = await grievancesResponse.json();
                    throw new Error(`Failed to fetch grievances: ${JSON.stringify(errorData)}`);
                }
                const grievancesData = await grievancesResponse.json();
                console.log('Grievances fetched:', grievancesData);
                setGrievanceList(grievancesData.map(g => ({
                    id: g.id.toString(),
                    title: g.title,
                    description: g.description,
                    status: g.status,
                    date: g.created_at ? g.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
                    department: g.department,
                    imageUri: g.image_url || null,
                    state: g.state || state || municipalitiesData.find(m => m.id === g.municipality)?.state || '',
                    municipality: municipalitiesData.find(m => m.id === g.municipality)?.name || g.municipality?.name || '',
                })));
            } catch (error) {
                console.error('Error fetching data:', error.message);
                Alert.alert('Error', `Failed to load data: ${error.message}`);
            }
        };
        fetchData();
    }, []);

    // Effect to update selected municipality when the list changes
    useEffect(() => {
        if (municipalities.length > 0 && !selectedMunicipality) {
            setSelectedMunicipality(municipalities[0].name || municipalities[0]);
        }
    }, [municipalities, selectedMunicipality]);

    const showFeedbackModal = () => setIsFeedbackVisible(true);
    const hideFeedbackModal = () => {
        setFeedbackComment('');
        setFeedbackRating(0);
        setFeedbackDepartment(DEPARTMENTS[0]);
        setFeedbackImageUri(null);
        setIsFeedbackVisible(false);
    };
    
    const showGrievanceModal = () => setIsGrievanceVisible(true);
    const hideGrievanceModal = () => {
        setGrievanceTitle('');
        setGrievanceDescription('');
        setGrievanceDepartment(DEPARTMENTS[0]);
        setGrievanceImageUri(null);
        setIsGrievanceVisible(false);
    };

    // Function to simulate image picking
    const pickImage = (setImageUri) => {
        Alert.alert(
            "Add Image (Simulated)",
            "Enter a placeholder image URL (e.g., https://picsum.photos/200/300):",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "OK",
                    onPress: (url) => {
                        if (url) {
                            setImageUri(url);
                        }
                    }
                }
            ],
            { defaultValue: "https://picsum.photos/200/300" }
        );
    };

    // Submit feedback to backend
    const handleSubmitFeedback = async () => {
        if (feedbackRating === 0 || !feedbackComment || !selectedMunicipality || !feedbackDepartment) {
            Alert.alert("Missing Information", "Please provide a rating, select a municipality and department, and enter a comment.");
            return;
        }

        try {
            const token = await AsyncStorage.getItem('accessToken');
            if (!token) throw new Error('No access token found');

            const formData = new FormData();
            formData.append('rating', feedbackRating);
            formData.append('comment', feedbackComment);
            formData.append('department', feedbackDepartment);
            formData.append('state', state || municipalities.find(m => m.name === selectedMunicipality)?.state || '');
            const selectedMunicipalityObj = municipalities.find(m => m.name.toLowerCase() === selectedMunicipality.toLowerCase());            if (!municipalityObj) throw new Error('Invalid municipality');
            formData.append('municipality', municipalityObj.id);
            if (feedbackImageUri) {
                formData.append('image', {
                    uri: feedbackImageUri,
                    type: 'image/jpeg',
                    name: 'image.jpg',
                });
            }

            console.log('Submitting feedback with payload:', {
                rating: feedbackRating,
                comment: feedbackComment,
                department: feedbackDepartment,
                state: state || municipalities.find(m => m.name === selectedMunicipality)?.state || '',
                municipality: municipalityObj.id,
                imageUri: feedbackImageUri,
            });

            const response = await fetch('http://127.0.0.1:8000/api/feedback/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const responseData = await response.json();
            if (!response.ok) {
                console.error('Feedback submission error response:', responseData);
                throw new Error(responseData.detail || responseData.non_field_errors?.join(', ') || 'Failed to submit feedback');
            }

            console.log('Feedback submission response:', responseData);
            setFeedbackList([{
                id: responseData.id.toString(),
                municipality: selectedMunicipality,
                rating: responseData.rating,
                comment: responseData.comment,
                date: responseData.created_at ? responseData.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
                department: responseData.department,
                imageUri: responseData.image_url || feedbackImageUri || null,
                state: responseData.state || state,
            }, ...feedbackList]);
            Alert.alert('Success', 'Feedback submitted successfully');
        } catch (error) {
            console.error('Feedback submission error:', error.message);
            Alert.alert('Error', `Failed to submit feedback: ${error.message}`);
        }
        hideFeedbackModal();
    };

    // Submit grievance to backend
    const handleSubmitGrievance = async () => {
        if (!grievanceTitle || !grievanceDescription || !selectedMunicipality || !grievanceDepartment) {
            Alert.alert("Missing Information", "Please fill all fields and select a department.");
            return;
        }

        try {
            const token = await AsyncStorage.getItem('accessToken');
            if (!token) throw new Error('No access token found');

            const formData = new FormData();
            formData.append('title', grievanceTitle);
            formData.append('description', grievanceDescription);
            formData.append('department', grievanceDepartment);
            formData.append('state', state || municipalities.find(m => m.name === selectedMunicipality)?.state || '');
            const municipalityObj = municipalities.find(m => m.name === selectedMunicipality);
            if (!municipalityObj) throw new Error('Invalid municipality');
            formData.append('municipality', municipalityObj.id);
            if (grievanceImageUri) {
                formData.append('image', {
                    uri: grievanceImageUri,
                    type: 'image/jpeg',
                    name: 'image.jpg',
                });
            }

            console.log('Submitting grievance with payload:', {
                title: grievanceTitle,
                description: grievanceDescription,
                department: grievanceDepartment,
                state: state || municipalities.find(m => m.name === selectedMunicipality)?.state || '',
                municipality: municipalityObj.id,
                imageUri: grievanceImageUri,
            });

            const response = await fetch('http://127.0.0.1:8000/api/grievance/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const responseData = await response.json();
            if (!response.ok) {
                console.error('Grievance submission error response:', responseData);
                throw new Error(responseData.detail || responseData.non_field_errors?.join(', ') || 'Failed to submit grievance');
            }

            console.log('Grievance submission response:', responseData);
            setGrievanceList([{
                id: responseData.id.toString(),
                title: responseData.title,
                description: responseData.description,
                status: responseData.status || 'Open',
                date: responseData.created_at ? responseData.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
                department: responseData.department,
                imageUri: responseData.image_url || grievanceImageUri || null,
                state: responseData.state || state,
                municipality: selectedMunicipality,
            }, ...grievanceList]);
            Alert.alert('Success', 'Grievance submitted successfully');
        } catch (error) {
            console.error('Grievance submission error:', error.message);
            Alert.alert('Error', `Failed to submit grievance: ${error.message}`);
        }
        hideGrievanceModal();
    };

    // Render selector list for municipalities and departments
    const renderSelectorList = (list, selectedValue, onSelect, hideModal) => (
        <ScrollView style={styles.selectorContent}>
            {list.map((value, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.selectOption}
                    onPress={() => {
                        onSelect(value.name || value);
                        hideModal();
                    }}
                >
                    <Text style={{ fontWeight: (value.name || value) === selectedValue ? 'bold' : 'normal', color: (value.name || value) === selectedValue ? '#303f9f' : '#333' }}>
                        {value.name || value}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );

    // Render Feedback Item
    const renderFeedbackItem = ({ item }) => (
        <Card style={styles.listItem}>
            <Card.Content>
                <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{item.municipality}</Text>
                    <Chip style={styles.departmentChip}>{item.department}</Chip>
                </View>
                <Text style={styles.itemDate}>State: {item.state} | {item.date}</Text>
                <StarRating rating={item.rating} />
                <Text>{item.comment}</Text>
                {item.imageUri && (
                    <View style={styles.imagePreviewContainer}>
                        <Text style={styles.imageLabel}>Attached Image:</Text>
                        <Image
                            source={{ uri: item.imageUri }}
                            style={styles.itemImage}
                            resizeMode="cover"
                        />
                    </View>
                )}
            </Card.Content>
        </Card>
    );

    // Render Grievance Item
    const renderGrievanceItem = ({ item }) => (
        <Card style={styles.listItem}>
            <Card.Content>
                <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Chip style={styles.departmentChip}>{item.department}</Chip>
                </View>
                <Text style={styles.itemDate}>State: {item.state} | {item.date}</Text>
                <Text style={{ marginBottom: 8, color: '#555' }}>Status: {item.status}</Text>
                <Text>{item.description}</Text>
                {item.imageUri && (
                    <View style={styles.imagePreviewContainer}>
                        <Text style={styles.imageLabel}>Attached Image:</Text>
                        <Image
                            source={{ uri: item.imageUri }}
                            style={styles.itemImage}
                            resizeMode="cover"
                        />
                    </View>
                )}
            </Card.Content>
        </Card>
    );

    return (
        <SafeAreaProvider>
            <Provider>
                <SafeAreaView style={styles.container}>
                    <Text variant="headlineSmall" style={styles.title}>
                        {districtName} Feedback Hub
                    </Text>
                    
                    <View style={styles.tabContainer}>
                        <Button 
                            mode={activeTab === 'Feedback' ? 'contained' : 'outlined'}
                            onPress={() => setActiveTab('Feedback')}
                            style={styles.tabButton}
                        >
                            Feedback ({feedbackList.length})
                        </Button>
                        <Button 
                            mode={activeTab === 'Grievance' ? 'contained' : 'outlined'}
                            onPress={() => setActiveTab('Grievance')}
                            style={styles.tabButton}
                        >
                            Grievances ({grievanceList.length})
                        </Button>
                    </View>

                    <View style={styles.actionRow}>
                        <Button 
                            mode="contained" 
                            icon={activeTab === 'Feedback' ? 'plus' : 'alert-circle-outline'}
                            onPress={activeTab === 'Feedback' ? showFeedbackModal : showGrievanceModal}
                            style={styles.actionButton}
                        >
                            {activeTab === 'Feedback' ? 'Submit Feedback' : 'Report Grievance'}
                        </Button>
                    </View>

                    <Divider style={styles.divider} />

                    <Text style={styles.listTitle}>{activeTab} History</Text>
                    
                    {activeTab === 'Feedback' ? (
                        <FlatList
                            data={feedbackList}
                            renderItem={renderFeedbackItem}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.listContent}
                            ListEmptyComponent={<Text style={styles.emptyText}>No feedback submitted yet for {districtName}.</Text>}
                        />
                    ) : (
                        <FlatList
                            data={grievanceList}
                            renderItem={renderGrievanceItem}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.listContent}
                            ListEmptyComponent={<Text style={styles.emptyText}>No grievances reported yet for {districtName}.</Text>}
                        />
                    )}
                </SafeAreaView>

                {/* --- Feedback Submission Modal --- */}
                <Portal>
                    <Modal 
                        visible={isFeedbackVisible && !isMunicipalitySelectorVisible && !isFeedbackDepartmentSelectorVisible} 
                        onDismiss={hideFeedbackModal} 
                        contentContainerStyle={styles.modalContainer}
                    >
                        <View style={styles.modalContent}>
                            <Text variant="titleLarge" style={styles.modalTitle}>Submit Feedback for {districtName}</Text>
                            
                            <TextInput
                                label="State"
                                value={state}
                                mode="outlined"
                                style={styles.fixedInput}
                                editable={false}
                            />

                            <TextInput
                                label="Municipality"
                                value={selectedMunicipality}
                                mode="outlined"
                                style={styles.fixedInput}
                                right={<TextInput.Icon icon="menu-down" onPress={() => setIsMunicipalitySelectorVisible(true)} />}
                                editable={false}
                            />
                            
                            <TextInput
                                label="Department to review"
                                value={feedbackDepartment}
                                mode="outlined"
                                style={styles.fixedInput}
                                right={<TextInput.Icon icon="menu-down" onPress={() => setIsFeedbackDepartmentSelectorVisible(true)} />}
                                editable={false}
                            />

                            <Text style={styles.ratingText}>Rate the services:</Text>
                            <View style={styles.ratingRow}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <IconButton
                                        key={star}
                                        icon={star <= feedbackRating ? 'star' : 'star-outline'}
                                        iconColor={star <= feedbackRating ? '#FFC107' : '#CCC'}
                                        size={30}
                                        onPress={() => setFeedbackRating(star)}
                                    />
                                ))}
                            </View>

                            <TextInput
                                label="Your Comment"
                                placeholder="Share your experience and suggestions..."
                                value={feedbackComment}
                                onChangeText={setFeedbackComment}
                                mode="outlined"
                                multiline
                                numberOfLines={4}
                                style={{ marginBottom: 20 }}
                            />
                            
                            <View style={styles.imageUploadRow}>
                                <Button 
                                    mode="outlined" 
                                    icon="camera"
                                    onPress={() => pickImage(setFeedbackImageUri)}
                                    style={styles.imageButton}
                                >
                                    {feedbackImageUri ? 'Change Photo' : 'Add Photo (Optional)'}
                                </Button>
                                {feedbackImageUri && (
                                    <Chip 
                                        icon="check" 
                                        onClose={() => setFeedbackImageUri(null)}
                                        style={styles.imageChip}
                                    >
                                        Image Attached
                                    </Chip>
                                )}
                            </View>

                            <Button mode="contained" onPress={handleSubmitFeedback} style={styles.modalButton}>
                                Submit Feedback
                            </Button>
                        </View>
                    </Modal>
                </Portal>
                
                <Portal>
                    <Modal 
                        visible={isMunicipalitySelectorVisible && (isFeedbackVisible || isGrievanceVisible)} 
                        onDismiss={() => setIsMunicipalitySelectorVisible(false)} 
                        contentContainerStyle={styles.selectorModalContainer}
                    >
                        <Text variant="titleMedium" style={styles.modalTitle}>Select Municipality</Text>
                        {renderSelectorList(
                            municipalities, 
                            selectedMunicipality, 
                            setSelectedMunicipality, 
                            () => setIsMunicipalitySelectorVisible(false)
                        )}
                    </Modal>
                </Portal>

                <Portal>
                    <Modal 
                        visible={isFeedbackDepartmentSelectorVisible && isFeedbackVisible} 
                        onDismiss={() => setIsFeedbackDepartmentSelectorVisible(false)} 
                        contentContainerStyle={styles.selectorModalContainer}
                    >
                        <Text variant="titleMedium" style={styles.modalTitle}>Select Department</Text>
                        {renderSelectorList(
                            DEPARTMENTS, 
                            feedbackDepartment, 
                            setFeedbackDepartment, 
                            () => setIsFeedbackDepartmentSelectorVisible(false)
                        )}
                    </Modal>
                </Portal>

                <Portal>
                    <Modal 
                        visible={isGrievanceVisible && !isMunicipalitySelectorVisible && !isGrievanceDepartmentSelectorVisible} 
                        onDismiss={hideGrievanceModal} 
                        contentContainerStyle={styles.modalContainer}
                    >
                        <View style={styles.modalContent}>
                            <Text variant="titleLarge" style={styles.modalTitle}>Report Grievance for {districtName}</Text>
                            
                            <TextInput
                                label="State"
                                value={state}
                                mode="outlined"
                                style={styles.fixedInput}
                                editable={false}
                            />

                            <TextInput
                                label="Municipality"
                                value={selectedMunicipality}
                                mode="outlined"
                                style={styles.fixedInput}
                                right={<TextInput.Icon icon="menu-down" onPress={() => setIsMunicipalitySelectorVisible(true)} />}
                                editable={false}
                            />
                            
                            <TextInput
                                label="Relevant Department"
                                value={grievanceDepartment}
                                mode="outlined"
                                style={styles.fixedInput}
                                right={<TextInput.Icon icon="menu-down" onPress={() => setIsGrievanceDepartmentSelectorVisible(true)} />}
                                editable={false}
                            />

                            <TextInput
                                label="Grievance Title (e.g., Water Shortage, Road Damage)"
                                value={grievanceTitle}
                                onChangeText={setGrievanceTitle}
                                mode="outlined"
                                style={styles.fixedInput}
                            />
                            
                            <TextInput
                                label="Detailed Description"
                                placeholder="Provide location, date, and other relevant details..."
                                value={grievanceDescription}
                                onChangeText={setGrievanceDescription}
                                mode="outlined"
                                multiline
                                numberOfLines={5}
                                style={{ marginBottom: 20 }}
                            />
                            
                            <View style={styles.imageUploadRow}>
                                <Button 
                                    mode="outlined" 
                                    icon="camera"
                                    onPress={() => pickImage(setGrievanceImageUri)}
                                    style={styles.imageButton}
                                >
                                    {grievanceImageUri ? 'Change Photo' : 'Add Photo (Proof)'}
                                </Button>
                                {grievanceImageUri && (
                                    <Chip 
                                        icon="check" 
                                        onClose={() => setGrievanceImageUri(null)}
                                        style={styles.imageChip}
                                    >
                                        Image Attached
                                    </Chip>
                                )}
                            </View>

                            <Button mode="contained" onPress={handleSubmitGrievance} style={styles.modalButton}>
                                Submit Grievance
                            </Button>
                        </View>
                    </Modal>
                </Portal>

                <Portal>
                    <Modal 
                        visible={isGrievanceDepartmentSelectorVisible && isGrievanceVisible} 
                        onDismiss={() => setIsGrievanceDepartmentSelectorVisible(false)} 
                        contentContainerStyle={styles.selectorModalContainer}
                    >
                        <Text variant="titleMedium" style={styles.modalTitle}>Select Department</Text>
                        {renderSelectorList(
                            DEPARTMENTS, 
                            grievanceDepartment, 
                            setGrievanceDepartment, 
                            () => setIsGrievanceDepartmentSelectorVisible(false)
                        )}
                    </Modal>
                </Portal>
            </Provider>
        </SafeAreaProvider>
    );
};

// Styles remain the same
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    title: {
        textAlign: 'center',
        marginVertical: 16,
        fontWeight: 'bold',
        color: '#1a237e',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    tabButton: {
        flex: 1,
        marginHorizontal: 4,
        borderRadius: 8,
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    actionButton: {
        flex: 1,
        marginHorizontal: 4,
        borderRadius: 8,
    },
    divider: {
        marginHorizontal: 16,
        marginVertical: 8,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    listItem: {
        marginVertical: 6,
        borderRadius: 10,
        elevation: 1,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    itemTitle: {
        fontWeight: 'bold',
        color: '#303f9f',
        flexShrink: 1,
    },
    departmentChip: {
        height: 20,
        marginLeft: 8,
    },
    itemDate: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    itemImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
    imagePreviewContainer: {
        marginTop: 10,
        marginBottom: 5,
        padding: 5,
    },
    imageLabel: {
        marginBottom: 5,
        color: '#555',
        fontWeight: '600',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#888',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 12,
        maxHeight: '90%',
    },
    selectorModalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 12,
        maxHeight: '70%',
        elevation: 10,
    },
    modalContent: {
        padding: 10,
    },
    selectorContent: {
        padding: 10,
    },
    modalTitle: {
        textAlign: 'center',
        marginBottom: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    fixedInput: {
        marginBottom: 16,
        backgroundColor: '#ffffff',
    },
    ratingText: {
        marginTop: 8,
        marginBottom: 4,
        fontWeight: '500',
    },
    ratingRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 16,
        marginLeft: -12,
    },
    imageUploadRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        flexWrap: 'wrap',
    },
    imageButton: {
        marginRight: 10,
    },
    imageChip: {
        backgroundColor: '#e8f5e9',
    },
    modalButton: {
        borderRadius: 8,
        paddingVertical: 4,
    },
    listTitle: {
        marginTop: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#444',
        paddingHorizontal: 16,
    },
    selectOption: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    }
});

export default FeedbackAndGrivanceScreen;